from fastapi import APIRouter, UploadFile, File
from schemas.ingest_schema import IngestResponse, StatusResponse
from services.ingest_service import ingest_service

router = APIRouter()


@router.post("/file", response_model=IngestResponse)
def upload_file(file: UploadFile = File(...)):
    """
    Upload a PDF or TXT file, extract its text, chunk it,
    embed each chunk with Ollama, and store in ChromaDB.
    """
    file_bytes = file.file.read()
    return ingest_service.process_file(file.filename, file_bytes)


@router.get("/")
def list_documents():
    """
    Lists all documents processed by the system.
    """
    return ingest_service.get_all_documents()


@router.get("/status/{id}", response_model=StatusResponse)
def status(id: str):
    """
    Returns the ingestion status for a given file_id.
    """
    return ingest_service.get_ingestion_status(id)
