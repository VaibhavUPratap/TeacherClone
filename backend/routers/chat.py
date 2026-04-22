from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

router = APIRouter()


@router.post("/ask")
def ask():
    return {
        "answer": "This is a mock AI response.",
        "source": "Lecture Notes",
        "confidence": 0.9,
    }


@router.get("/stream", response_class=PlainTextResponse)
def stream():
    return "chunk-1\nchunk-2\nchunk-3"
