import sys
import os

# Use the venv's site-packages
venv_path = r"D:\Projects\TeacherClone\backend\venv"
sys.path.insert(0, os.path.join(venv_path, "Lib", "site-packages"))

try:
    print("Attempting to import TTS...")
    from TTS.api import TTS
    print("TTS imported successfully!")
    
    # Try to initialize (this might take time as it downloads/loads model)
    # tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
    # print("TTS model initialized successfully!")
except Exception as e:
    print(f"Error importing or initializing TTS: {e}")
    import traceback
    traceback.print_exc()
