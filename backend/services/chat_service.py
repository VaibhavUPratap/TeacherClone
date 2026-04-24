import httpx
import json
from openai import OpenAI
from config import settings
from .knowledge_base import get_keyword_answer
from .vector_service import vector_service

from datetime import datetime

CHAT_HISTORY = [] # List of dicts: {"question": str, "category": str, "time": str}

class ChatService:
    """Service to handle chat logic using either OpenAI or Ollama."""

    def __init__(self):
        self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.ollama_url = f"{settings.OLLAMA_BASE_URL}/api/chat"
        self.use_ollama = True  # Set to True to use local Ollama by default

    def generate_answer(self, question: str) -> dict:
        """
        Generates an answer using keywords first, then falls back to LLM with topic validation and categorization.
        """
        # Step 1: Validate Topic and Identify Category
        is_on_topic, category = self._validate_and_categorize(question)
        
        # Log to history (Real system behavior: store questions)
        CHAT_HISTORY.append({
            "question": question,
            "category": category,
            "time": datetime.now().strftime("%I:%M %p")
        })

        if not is_on_topic:
            return {
                "answer": "I'm sorry, I am designed to assist with educational and study-related questions only. How can I help you with your lessons today?",
                "source": "Topic Guard",
                "confidence": 0.0
            }

        # Step 2: Check Fast-Path Knowledge Base (Keywords)
        keyword_match = get_keyword_answer(question)
        if keyword_match:
            return keyword_match

        # Step 3: Generate Answer with LLM
        if self.use_ollama:
            return self._generate_with_ollama(question)
        else:
            return self._generate_with_openai(question)

    def _validate_and_categorize(self, question: str) -> tuple[bool, str]:
        """
        Uses the LLM to determine if the question is education-related and categorize it.
        Returns (is_on_topic, category)
        """
        prompt = (
            "You are a classifier for an educational assistant. "
            "1. Determine if the input is related to education/learning (YES/NO). "
            "2. Provide a 1-2 word category for the subject (e.g., 'Biology', 'Math', 'History', or 'Off-topic'). "
            "Respond in JSON format: {\"on_topic\": boolean, \"category\": \"string\"}"
            f"\n\nUser Input: {question}"
        )

        try:
            if self.use_ollama:
                payload = {
                    "model": settings.OLLAMA_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "stream": False,
                    "format": "json"
                }
                with httpx.Client(timeout=10.0) as client:
                    response = client.post(self.ollama_url, json=payload)
                    response.raise_for_status()
                    data = response.json()
                    res = json.loads(data["message"]["content"])
            else:
                response = self.openai_client.chat.completions.create(
                    model="gpt-4o",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.0
                )
                res = json.loads(response.choices[0].message.content)

            return res.get("on_topic", True), res.get("category", "General")
        except Exception as e:
            print(f"Topic Validation Error: {e}")
            return True, "General"

    # ── RAG helpers ────────────────────────────────────────────────────────

    def _get_question_embedding(self, question: str) -> list[float] | None:
        """
        Call Ollama's /api/embeddings endpoint to embed the user's question.
        Returns None on failure so the caller can handle gracefully.
        """
        try:
            url = f"{settings.OLLAMA_BASE_URL}/api/embeddings"
            payload = {"model": settings.OLLAMA_EMBED_MODEL, "prompt": question}
            with httpx.Client(timeout=30.0) as client:
                response = client.post(url, json=payload)
                response.raise_for_status()
            return response.json()["embedding"]
        except Exception as e:
            print(f"Embedding Error: {e}")
            return None

    def _generate_with_ollama(self, question: str) -> dict:
        """
        RAG-aware Ollama generation.

        Flow:
          1. Embed the question with nomic-embed-text.
          2. Retrieve top-3 relevant chunks from ChromaDB.
          3. If chunks found  → build a context-injected prompt and call llama3.
          4. If no chunks     → return a clear "no data" message (never hallucinate).
        """
        try:
            # ── Step 1: Embed the question ───────────────────────────────────
            query_embedding = self._get_question_embedding(question)

            # ── Step 2: Retrieve context from vector DB ──────────────────────
            context_chunks: list[str] = []
            if query_embedding is not None:
                context_chunks = vector_service.query_similar(
                    query_embedding=query_embedding,
                    n_results=3,
                )

            # ── Step 3: Guard — no context found ────────────────────────────
            if not context_chunks:
                return {
                    "answer": (
                        "No relevant data found in knowledge base. "
                        "Please upload study materials first using the /ingest/file endpoint."
                    ),
                    "source": "RAG Guard",
                    "confidence": 0.0,
                }

            # ── Step 4: Build structured prompt ─────────────────────────────
            context_text = "\n\n---\n\n".join(
                f"[Chunk {i + 1}]\n{chunk}"
                for i, chunk in enumerate(context_chunks)
            )
            rag_prompt = (
                "Answer the question using ONLY the context provided below. "
                "If the context does not contain enough information, say so honestly.\n\n"
                f"Context:\n{context_text}\n\n"
                f"Question:\n{question}"
            )

            # ── Step 5: Call llama3 ──────────────────────────────────────────
            payload = {
                "model": settings.OLLAMA_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are TeacherClone, a helpful teaching assistant. "
                            "Answer questions strictly based on the provided context. "
                            "Do not make up information not present in the context."
                        ),
                    },
                    {"role": "user", "content": rag_prompt},
                ],
                "stream": False,
            }

            with httpx.Client(timeout=60.0) as client:
                response = client.post(self.ollama_url, json=payload)
                response.raise_for_status()
                data = response.json()

            answer = data["message"]["content"]

            return {
                "answer": answer,
                "source": f"RAG · Ollama ({settings.OLLAMA_MODEL})",
                "confidence": 0.92,
            }

        except Exception as e:
            print(f"Ollama RAG Error: {e}. Falling back to OpenAI...")
            return self._generate_with_openai(question)

    def _generate_with_openai(self, question: str) -> dict:
        """
        Generates an answer using OpenAI's GPT-4o model.
        """
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system", 
                        "content": (
                            "You are a helpful teaching assistant named TeacherClone. "
                            "You ONLY answer questions related to education, school, and learning. "
                            "If a question is off-topic, politely refuse and redirect to studies."
                        )
                    },
                    {"role": "user", "content": question}
                ],
                temperature=0.7
            )

            answer = response.choices[0].message.content
            
            return {
                "answer": answer,
                "source": "OpenAI GPT-4o",
                "confidence": 0.95
            }
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return {
                "answer": f"I encountered an error while processing your request: {e}",
                "source": "Error System",
                "confidence": 0.0
            }

    async def stream_answer(self, question: str):
        """
        Generates a streaming answer using Ollama and yields SSE formatted chunks.
        """
        # Log to history
        CHAT_HISTORY.append({
            "question": question,
            "category": "Streaming",
            "time": datetime.now().strftime("%I:%M %p")
        })

        url = f"{settings.OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": settings.OLLAMA_MODEL,
            "prompt": question,
            "stream": True
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                async with client.stream("POST", url, json=payload) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if not line:
                            continue
                        
                        try:
                            data = json.loads(line)
                            token = data.get("response", "")
                            # Format for SSE
                            yield f"data: {token}\n\n"
                            
                            if data.get("done"):
                                break
                        except json.JSONDecodeError:
                            continue
            except Exception as e:
                print(f"Streaming Error: {e}")
                yield f"data: Error: {str(e)}\n\n"

    def get_mock_stream_data(self) -> str:
        """
        Returns a mock streaming response string.
        Logic moved from router to service to follow Clean Architecture.
        """
        return "Mock Stream: [Thinking...] [Searching Source...] [Generative Response...]"

chat_service = ChatService()
