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
import re
import uuid
import wave
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
    from TTS.api import TTS as CoquiTTS
    _tts_model = CoquiTTS("tts_models/multilingual/multi-dataset/xtts_v2").to(_device)
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


def split_text_into_chunks(text: str, max_chars: int = 250) -> list[str]:
    """
    Split text into chunks of maximum length, trying to keep sentences intact.
    Respects sentence boundaries (. ! ?) and falls back to word-level splits for long sentences.
    """
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    chunks = []
    current_chunk = ""
    for sentence in sentences:
        if not sentence:
            continue
        # If sentence itself is too long, chunk by words
        if len(sentence) > max_chars:
            if current_chunk:
                chunks.append(current_chunk.strip())
                current_chunk = ""
            words = sentence.split(" ")
            sub_chunk = ""
            for word in words:
                if len(sub_chunk) + len(word) + 1 > max_chars:
                    chunks.append(sub_chunk.strip())
                    sub_chunk = word
                else:
                    sub_chunk = f"{sub_chunk} {word}" if sub_chunk else word
            if sub_chunk:
                current_chunk = sub_chunk
        else:
            if len(current_chunk) + len(sentence) + 1 > max_chars:
                chunks.append(current_chunk.strip())
                current_chunk = sentence
            else:
                current_chunk = f"{current_chunk} {sentence}" if current_chunk else sentence
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks


def concatenate_wavs(paths: list[str], output_path: str) -> None:
    """
    Stitches multiple WAV files together using python's built-in wave module.
    Assumes all files have the same structure (e.g. same channel count and frame rate).
    """
    if not paths:
        return
    with wave.open(paths[0], "rb") as first_file:
        params = first_file.getparams()
    with wave.open(output_path, "wb") as output_file:
        output_file.setparams(params)
        for path in paths:
            with wave.open(path, "rb") as input_file:
                output_file.writeframes(input_file.readframes(input_file.getnframes()))


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
    ) -> str:
        """
        Generate a WAV file from *text* and return its file path.
        Automatically chunks long text and concatenates generated audio files.

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
        FileNotFoundError  : If the speaker WAV for voice_id is missing and no fallback is found.
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
            logger.warning(
                "TTS: voice_id '%s' reference file not found. Finding fallback...",
                voice_id
            )
            # Find any available file in VOICES_DIR
            if VOICES_DIR.exists():
                available_files = [
                    p for p in VOICES_DIR.iterdir()
                    if p.suffix in extensions
                ]
                if available_files:
                    speaker_wav = available_files[0]
                    logger.warning(
                        "TTS: fallback selected: '%s' instead of '%s'.",
                        speaker_wav.name,
                        voice_id
                    )
            
        if not speaker_wav:
            raise FileNotFoundError(
                f"Speaker reference file not found for voice_id '{voice_id}' in {VOICES_DIR}, "
                f"and no fallback voice was found. Supported extensions: {extensions}"
            )

        # 2. Split text into chunks (XTTS works best with sentence-level chunks <250 chars)
        chunks = split_text_into_chunks(text, max_chars=250)
        logger.info("TTS: splitting text into %d chunks for generation.", len(chunks))

        # 3. Generate audio files for each chunk sequentially in thread pool
        loop = asyncio.get_event_loop()
        temp_files = []
        try:
            for idx, chunk in enumerate(chunks):
                temp_path = str(AUDIO_DIR / f"chunk_{uuid.uuid4().hex}.wav")
                logger.info("TTS: generating chunk %d/%d (%d chars)", idx + 1, len(chunks), len(chunk))
                await loop.run_in_executor(
                    _executor,
                    _run_inference,
                    chunk,
                    str(speaker_wav),
                    language,
                    temp_path,
                )
                temp_files.append(temp_path)
            
            # 4. Stitch WAV files together
            output_path = str(AUDIO_DIR / f"{uuid.uuid4().hex}.wav")
            concatenate_wavs(temp_files, output_path)
            logger.info("TTS: combined audio saved → %s", output_path)
            return output_path
        finally:
            # Clean up temporary chunk files
            for temp_file in temp_files:
                if os.path.exists(temp_file):
                    try:
                        os.remove(temp_file)
                    except Exception as e:
                        logger.warning("TTS: failed to remove temp file %s — %s", temp_file, e)


# ---------------------------------------------------------------------------
# Singleton — imported by the router
# ---------------------------------------------------------------------------
tts_service = TTSService()
