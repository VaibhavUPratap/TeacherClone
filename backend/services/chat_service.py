import httpx
import json
from openai import OpenAI
from ..config import settings
from .knowledge_base import get_keyword_answer

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
        
        # Log to history
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

    def _generate_with_ollama(self, question: str) -> dict:
        """
        Generates an answer using the local Ollama instance.
        """
        try:
            payload = {
                "model": settings.OLLAMA_MODEL,
                "messages": [
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
                "stream": False
            }
            
            with httpx.Client(timeout=30.0) as client:
                response = client.post(self.ollama_url, json=payload)
                response.raise_for_status()
                data = response.json()
                
            answer = data["message"]["content"]
            
            return {
                "answer": answer,
                "source": f"Ollama ({settings.OLLAMA_MODEL})",
                "confidence": 0.9
            }
        except Exception as e:
            print(f"Ollama Error: {e}. Falling back to OpenAI...")
            # Fallback to OpenAI if Ollama fails
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

    def get_mock_stream_data(self) -> str:
        """
        Returns a mock streaming response string.
        Logic moved from router to service to follow Clean Architecture.
        """
        return "Mock Stream: [Thinking...] [Searching Source...] [Generative Response...]"

chat_service = ChatService()
