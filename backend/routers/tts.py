from fastapi import APIRouter

router = APIRouter()


@router.post("/speak")
def speak():
    return {
        "audio_url": "/mock/audio.wav",
    }
