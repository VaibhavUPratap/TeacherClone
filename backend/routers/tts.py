"""
TTS Router — POST /tts/speak

Responsibilities (router only):
  * Parse and validate the incoming TTSRequest.
  * Delegate ALL logic to tts_service.
  * Return a FileResponse (WAV binary) or a meaningful HTTP error.

No business logic lives here.
"""

import logging
import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from schemas.tts_schema import TTSRequest
from services.tts_service import tts_service

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/speak",
    summary="Text-to-Speech (XTTS-v2)",
    response_class=FileResponse,
    responses={
        200: {
            "content": {"audio/wav": {}},
            "description": "Synthesised WAV audio file.",
        },
        404: {"description": "Speaker voice file not found."},
        500: {"description": "TTS model error."},
    },
)
async def speak(request: TTSRequest):
    """
    Convert *text* to speech using the locally-running Coqui XTTS-v2 model.

    - **text**: The sentence(s) to synthesise (1–5 000 characters).
    - **voice_id**: Speaker key — must match `data/voices/{voice_id}.wav`.
    - **language**: BCP-47 language code (default `"en"`).

    Returns a downloadable WAV file (`response.wav`).
    """
    try:
        audio_path = await tts_service.generate_audio(
            text=request.text,
            voice_id=request.voice_id,
            language=request.language,
        )
    except FileNotFoundError as exc:
        logger.warning("TTS speak: voice file missing — %s", exc)
        raise HTTPException(status_code=404, detail=str(exc))
    except RuntimeError as exc:
        logger.error("TTS speak: model error — %s", exc)
        raise HTTPException(status_code=500, detail=str(exc))
    except Exception as exc:  # pragma: no cover
        logger.exception("TTS speak: unexpected error")
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {exc}")

    # Confirm the file was actually written before responding
    if not os.path.exists(audio_path):
        raise HTTPException(
            status_code=500, detail="Audio file was not created by the TTS engine."
        )

    return FileResponse(
        path=audio_path,
        media_type="audio/wav",
        filename="response.wav",
    )


@router.get(
    "/voices",
    summary="List available speaker voices",
    response_model=list[str],
)
async def list_voices():
    """
    Return the list of speaker voice keys that are available on this server.
    Each key corresponds to a WAV file in `data/voices/`.
    """
    from pathlib import Path

    voices_dir = Path("backend/data/voices")
    if not voices_dir.exists():
        return []

    return [p.stem for p in voices_dir.iterdir() if p.suffix in [".wav", ".aac", ".mp3", ".flac"]]
