import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

load_dotenv()

# ---------------------------------------------------------------------------
# Firebase Admin SDK Initialization
# Place your downloaded service-account JSON at backend/firebase_admin.json
# ---------------------------------------------------------------------------
_FIREBASE_CRED_PATH = os.getenv(
    "FIREBASE_CREDENTIALS_PATH",
    os.path.join(os.path.dirname(__file__), "firebase_admin.json"),
)

if not firebase_admin._apps:
    if os.path.exists(_FIREBASE_CRED_PATH):
        cred = credentials.Certificate(_FIREBASE_CRED_PATH)
        firebase_admin.initialize_app(cred)
        print(f"[OK] Firebase Admin SDK initialized from: {_FIREBASE_CRED_PATH}")
    else:
        print(
            f"[WARNING] Firebase credentials not found at '{_FIREBASE_CRED_PATH}'. "
            "Token verification will fail until the file is placed there."
        )

# ---------------------------------------------------------------------------

class Settings(BaseSettings):
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecret")

    # Firebase
    FIREBASE_CREDENTIALS_PATH: str = _FIREBASE_CRED_PATH

    # Ollama Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3")
    OLLAMA_EMBED_MODEL: str = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")

    # Frontend Settings
    VITE_API_BASE_URL: str = os.getenv("VITE_API_BASE_URL", "http://localhost:8000")

    # Model config to read from .env file
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
