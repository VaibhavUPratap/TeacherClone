from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from ..schemas.chat_schema import ChatRequest, ChatResponse
from ..services import chat_service

router = APIRouter()


@router.post("/ask", response_model=ChatResponse)
def ask(request: ChatRequest):
    """
    Hands over the question to the chat service for processing.
    Clean Architecture: Router handles HTTP, Service handles logic.
    """
    result = chat_service.generate_answer(request.question)
    return result


@router.get("/stream", response_class=PlainTextResponse)
def stream():
    """
    Simple mock streaming endpoint.
    Delegates logic to the ChatService.
    """
    return chat_service.get_mock_stream_data()
