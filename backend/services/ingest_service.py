import os
import uuid
import httpx
import fitz  # PyMuPDF

from config import settings
from .vector_service import vector_service

# Directory where uploaded files are temporarily saved
DOCUMENTS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "documents")
os.makedirs(DOCUMENTS_DIR, exist_ok=True)

# ── Text chunking helpers ────────────────────────────────────────────────────

CHUNK_WORD_SIZE = 400  # target words per chunk


def _chunk_text(text: str, chunk_size: int = CHUNK_WORD_SIZE) -> list[str]:
    """
    Split *text* into chunks of approximately *chunk_size* words.

    Splits on whitespace; preserves natural word boundaries.
    Returns only non-empty chunks.
    """
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i : i + chunk_size]).strip()
        if chunk:
            chunks.append(chunk)
    return chunks


# ── Embedding helper ─────────────────────────────────────────────────────────

def _get_embedding(text: str) -> list[float]:
    """
    Generate a dense embedding vector for *text* using Ollama's local API.

    Model: nomic-embed-text (configured via OLLAMA_EMBED_MODEL)
    Raises on HTTP errors so callers can surface the problem clearly.
    """
    url = f"{settings.OLLAMA_BASE_URL}/api/embeddings"
    payload = {
        "model": settings.OLLAMA_EMBED_MODEL,
        "prompt": text,
    }
    with httpx.Client(timeout=60.0) as client:
        response = client.post(url, json=payload)
        response.raise_for_status()
    return response.json()["embedding"]


# ── Text extraction ──────────────────────────────────────────────────────────

def _extract_text_from_pdf(file_path: str) -> str:
    """Extract all text from a PDF file using PyMuPDF."""
    doc = fitz.open(file_path)
    pages = [page.get_text() for page in doc]
    doc.close()
    return "\n".join(pages)


def _extract_text_from_txt(file_path: str) -> str:
    """Read raw text from a .txt file."""
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


# ── IngestService ────────────────────────────────────────────────────────────

class IngestService:
    """
    Handles end-to-end document ingestion for the RAG pipeline.

    Flow:
      1. Save the uploaded file to disk.
      2. Extract text (PDF or plain text).
      3. Split text into word-count chunks (~400 words each).
      4. Generate an Ollama embedding for each chunk.
      5. Store chunks + embeddings in ChromaDB via VectorService.
    """

    def process_file(self, filename: str, file_bytes: bytes) -> dict:
        """
        Ingest an uploaded file and populate the vector store.

        Args:
            filename:   Original filename (used to detect type & as metadata).
            file_bytes: Raw file content from the UploadFile.

        Returns:
            A dict with file_id, chunk_count, and status.
        """
        # 1. Persist the file
        file_path = os.path.join(DOCUMENTS_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(file_bytes)

        # 2. Extract text
        ext = os.path.splitext(filename)[-1].lower()
        if ext == ".pdf":
            raw_text = _extract_text_from_pdf(file_path)
        elif ext in (".txt", ".md"):
            raw_text = _extract_text_from_txt(file_path)
        else:
            return {
                "file_id": None,
                "status": "error",
                "detail": f"Unsupported file type: {ext}. Upload PDF or TXT.",
            }

        if not raw_text.strip():
            return {
                "file_id": None,
                "status": "error",
                "detail": "No text could be extracted from the file.",
            }

        # 3. Chunk
        chunks = _chunk_text(raw_text)

        # 4. Embed & 5. Store
        file_id = str(uuid.uuid4())
        ids: list[str] = []
        embeddings: list[list[float]] = []
        metadatas: list[dict] = []

        for i, chunk in enumerate(chunks):
            embedding = _get_embedding(chunk)
            ids.append(f"{file_id}_{i}")
            embeddings.append(embedding)
            metadatas.append({"source": filename, "chunk_index": i})

        vector_service.add_documents(
            chunks=chunks,
            ids=ids,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        return {
            "file_id": file_id,
            "chunk_count": len(chunks),
            "status": "completed",
        }

    def get_ingestion_status(self, file_id: str) -> dict:
        """
        Legacy status endpoint — real status is reflected by chunk_count above.
        """
        return {"file_id": file_id, "status": "completed"}


ingest_service = IngestService()
