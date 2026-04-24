"""
TTS Service — Coqui XTTS-v2 (local, no external API).

Design principles:
  * Model is loaded ONCE at module import time (global singleton).
  * Inference is CPU/GPU-bound; it is offloaded to a ThreadPoolExecutor
    so the FastAPI async event loop is never blocked.
  * Voice files are looked up by voice_id (maps to data/voices/{voice_id}.wav).
  * Audio output is written to data/audio/{uuid}.wav.
  * Future-ready: easily supports multiple voices, languages, and caching.
"""

import asyncio
import logging
import os
import uuid
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import torch

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Paths (relative to this file's location: backend/services/tts_service.py)
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent  # Points to 'backend/'
VOICES_DIR = BASE_DIR / "data" / "voices"
AUDIO_DIR = BASE_DIR / "data" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# XTTS-v2 text limit — the model handles ~400 tokens comfortably.
# We cap at 1 000 characters to avoid very long inference times.
# Increase this if your hardware supports it.
# ---------------------------------------------------------------------------
MAX_CHARS = 1000

# ---------------------------------------------------------------------------
# Load model ONCE — happens when the module is first imported (at startup).
# ---------------------------------------------------------------------------
_device = "cuda" if torch.cuda.is_available() else "cpu"
logger.info("TTS: loading XTTS-v2 model on device=%s …", _device)

try:
    # Temporarily disabled for diagnosis
    # from TTS.api import TTS as CoquiTTS
    _tts_model = None
except Exception as _load_err:
    logger.error("TTS: Failed to load XTTS-v2 model — %s", _load_err)
    _tts_model = None

# Thread pool for offloading CPU/GPU-bound inference
_executor = ThreadPoolExecutor(max_workers=2)


# ---------------------------------------------------------------------------
# Internal sync inference function (runs inside the thread pool)
# ---------------------------------------------------------------------------
def _run_inference(text: str, speaker_wav: str, language: str, output_path: str) -> None:
    """Blocking call to Coqui TTS. Must NOT be called directly from an async context."""
    if _tts_model is None:
        raise RuntimeError(
            "XTTS-v2 model is not loaded. "
            "Ensure 'TTS' is installed and the model download completed."
        )

    _tts_model.tts_to_file(
        text=text,
        speaker_wav=speaker_wav,
        language=language,
        file_path=output_path,
    )


# ---------------------------------------------------------------------------
# Public async API
# ---------------------------------------------------------------------------
class TTSService:
    """
    Async-safe TTS service backed by Coqui XTTS-v2.

    Usage
    -----
    audio_path = await tts_service.generate_audio("Hello world")
    """

    # ------------------------------------------------------------------
    async def generate_audio(
        self,
        text: str,
        voice_id: str = "vaibhav",
        language: str = "en",
        """
        Generate a WAV file from *text* and return its file path.

        Parameters
        ----------
        text      : Text to synthesise.
        voice_id  : Key that maps to data/voices/{voice_id}.wav.
        language  : BCP-47 code accepted by XTTS-v2 (e.g. 'en', 'hi', 'es').

        Returns
        -------
        Absolute path to the generated WAV file.

        Raises
        ------
        FileNotFoundError  : If the speaker WAV for voice_id is missing.
        RuntimeError       : If the model could not be loaded at startup.
        """
        # 1. Resolve speaker WAV
        # We check for common extensions: .wav, .aac, .mp3, etc.
        extensions = [".wav", ".aac", ".mp3", ".flac"]
        speaker_wav = None
        
        for ext in extensions:
            candidate = VOICES_DIR / f"{voice_id}{ext}"
            if candidate.exists():
                speaker_wav = candidate
                break
                
        if not speaker_wav:
            raise FileNotFoundError(
                f"Speaker reference file not found for voice_id '{voice_id}' in {VOICES_DIR}. "
                f"Supported extensions: {extensions}"
            )

        # 2. Truncate text if needed
        if len(text) > MAX_CHARS:
            logger.warning(
                "TTS: text truncated from %d to %d chars.", len(text), MAX_CHARS
            )
            text = text[:MAX_CHARS]

        # 3. Unique output filename
        output_path = str(AUDIO_DIR / f"{uuid.uuid4().hex}.wav")

        # 4. Offload blocking inference to thread pool (never blocks event loop)
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            _executor,
            _run_inference,
            text,
            str(speaker_wav),
            language,
            output_path,
        )

        logger.info("TTS: audio saved → %s", output_path)
        return output_path


# ---------------------------------------------------------------------------
# Singleton — imported by the router
# ---------------------------------------------------------------------------
tts_service = TTSService()
