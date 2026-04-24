from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from schemas.chat_schema import ChatRequest, ChatResponse
from services import chat_service

router = APIRouter()


@router.post("/ask", response_model=ChatResponse)
def ask(request: ChatRequest):
    """
    Hands over the question to the chat service for processing.
    Clean Architecture: Router handles HTTP, Service handles logic.
    """
    result = chat_service.generate_answer(request.question)
    return result


@router.get("/stream")
async def stream(question: str):
    """
    Real-time streaming endpoint using Server-Sent Events (SSE).
    Calls the async generator in ChatService.
    """
    return StreamingResponse(
        chat_service.stream_answer(question),
        media_type="text/event-stream"
    )
