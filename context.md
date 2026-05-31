# TeacherClone — Project Context

**Last Updated**: June 1, 2026

---

## 📋 Project Overview

TeacherClone is an AI-powered educational tutoring platform. Students select a subject, choose an AI teacher clone, and learn through real-time streaming conversations grounded in uploaded lecture materials (RAG). Teachers and admins manage content through a separate dashboard view. The app features Google OAuth + email/password auth via Supabase, local text-to-speech using Coqui XTTS-v2 with **real voice cloning from lecture videos**, analytics dashboards, and role-based access control.

**Repository**: VaibhavUPratap/TeacherClone

---

## 🏗️ Architecture Overview

### Technology Stack

#### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Vector Database**: ChromaDB (local RAG document retrieval)
- **Database**: Supabase (PostgreSQL) — primary persistent store for all relational data
- **AI Models**:
  - Ollama `llama3` — local chat inference (primary)
  - Ollama `nomic-embed-text` — local embeddings for RAG
  - Google Gemini 2.5 Flash — cloud fallback when Ollama is unavailable
- **Text-to-Speech**: Coqui XTTS-v2 (local inference, runs on GPU)
- **Voice Cloning Pipeline**: FFmpeg + WebRTC VAD (webrtcvad-wheels) + XTTS-v2
  - Extracts 25s of clean sustained speech from lecture MP4s as speaker references
  - Per-teacher audio tuning: skip_intro_s, loudnorm normalization, VAD aggressiveness
  - All voices normalized to EBU R128 standard (-16 dB LUFS)
- **Transcription**: OpenAI Whisper (local, `openai-whisper`) — Phase 2, not yet run
- **Authentication**: Supabase Auth (JWT) verified by the backend
- **Password Hashing**: bcrypt via passlib
- **File Handling**: PyMuPDF (PDF text extraction), python-pptx (PPTX slide extraction)

#### Hardware (Local Machine)
- **GPU**: NVIDIA GeForce RTX 3050 Laptop GPU — 4.29 GB VRAM
- **CUDA**: Driver 581.57, CUDA Version 13.0
- **PyTorch**: `torch 2.6.0+cu124` (CUDA 12.4 build) — installed in venv
- **XTTS-v2 on GPU**: ~5–25s per inference clip (vs ~3–5 min on CPU)

#### Frontend
- **Framework**: React 18 (JSX)
- **Build Tool**: Vite 5
- **State Management**: React Hooks + Context API
- **Routing**: React Router v7
- **Auth Client**: Supabase JS (`@supabase/supabase-js`)
- **HTTP**: Axios / Fetch for backend API calls
- **UI Libraries**:
  - Framer Motion — animations & transitions
  - Lucide React — icons
  - Recharts — analytics charts
- **Styling**: Vanilla CSS with glassmorphism/atmospheric design system (CSS custom properties, OKLCH colours)

#### Infrastructure
- **Auth Provider**: Supabase (email/password + Google OAuth)
- **Google OAuth**: Configured via Google Cloud Console + Supabase Auth Providers
- **Ollama**: Running locally on `http://localhost:11434`
- **API Base**: `http://localhost:8000` (development)
- **Frontend Dev Server**: `http://localhost:5173` (Vite)
- **FFmpeg**: Gyan build installed via winget — PATH injected dynamically by `config.py`

---

## 📁 Directory Structure

```
TeacherClone/
├── backend/                        # FastAPI server
│   ├── main.py                     # App entry point, middleware, router mounting
│   ├── config.py                   # Settings (pydantic-settings), Supabase client init, FFmpeg PATH injection
│   ├── requirements.txt            # Includes CUDA torch via --extra-index-url
│   ├── .env                        # Backend secrets (GEMINI_API_KEY, SUPABASE_URL, etc.)
│   ├── routers/
│   │   ├── auth.py                 # POST /auth/login, /auth/logout, /auth/refresh
│   │   ├── chat.py                 # POST /chat/message, GET /chat/stream, GET /chat/history
│   │   ├── ingest.py               # POST /ingest/file, GET /ingest/documents, DELETE /ingest/document/{id}
│   │   ├── tts.py                  # POST /tts/speak, GET /tts/voices, POST /tts/upload, GET /tts/voices/{id}
│   │   └── dashboard.py            # GET /dashboard/analytics/{user_id}
│   ├── services/
│   │   ├── auth_service.py         # JWT creation/verification, Supabase user lookup
│   │   ├── chat_service.py         # RAG pipeline: embed → ChromaDB → Ollama/Gemini stream
│   │   ├── teacher_service.py      # Teacher clone CRUD, personality prompt management, DB seeding (upsert-safe)
│   │   ├── ingest_service.py       # PDF/PPTX text extraction, chunking, ChromaDB ingestion
│   │   ├── vector_service.py       # ChromaDB wrapper (add, query, delete collections)
│   │   ├── tts_service.py          # XTTS-v2 on GPU: device detection, VRAM-aware chunking, CUDA cache clearing
│   │   ├── voice_extraction_service.py  # FFmpeg+VAD pipeline: MP4 → normalized 25s WAV
│   │   ├── dashboard_service.py    # Aggregates Supabase chat metrics for analytics
│   │   └── knowledge_base.py       # Static keyword-based fast-path answer lookup
│   ├── schemas/                    # Pydantic request/response models
│   ├── scripts/                    # CLI utilities (run from backend/ directory)
│   │   ├── extract_teacher_voices.py   # Batch voice extraction — COMPLETED, all 4 voices extracted
│   │   ├── test_clone.py               # End-to-end clone test — COMPLETED, all 4 passed on GPU
│   │   ├── transcribe_lectures.py      # Whisper transcription + Ollama personality extraction (Phase 2)
│   │   ├── ingest_lecture_transcripts.py  # Chunk transcripts → ChromaDB RAG ingestion (Phase 2)
│   │   └── check_voice_quality.py      # ffprobe quality report on extracted voices
│   ├── data/
│   │   ├── videos/                 # Source lecture MP4s
│   │   │   ├── Andrew-ML.mp4       # 135.9 MB — Machine Learning
│   │   │   ├── David-C.mp4         # 218.5 MB — C Programming
│   │   │   ├── Erik-ADSA.mp4       # 259.0 MB — Algorithms & Data Structures
│   │   │   └── Grant-LLM.mp4       # 60.7 MB  — Large Language Models
│   │   ├── voices/                 # XTTS-v2 speaker reference WAVs (16kHz mono, ~782 KB each)
│   │   │   ├── andrew-ml.wav       # skip=8s, loudnorm, VAD=1 — mean=-16.8 dB ✓
│   │   │   ├── david-c.wav         # skip=78s (past title gap), loudnorm, VAD=2 — mean=-16.4 dB ✓
│   │   │   ├── erik-adsa.wav       # skip=22s, loudnorm+limiter (was clipping 0dB), VAD=3 — mean=-16.8 dB ✓
│   │   │   ├── grant-llm.wav       # skip=2s, no loudnorm needed — mean=-15.3 dB ✓
│   │   │   ├── dr-rao.wav          # Original Math teacher voice
│   │   │   ├── prof-sharma.wav     # Original Math teacher voice
│   │   │   ├── ms-priya.aac        # Original Math teacher voice
│   │   │   └── vaibhav.aac         # Developer test voice
│   │   ├── audio/                  # Generated TTS output WAVs
│   │   │   ├── clone_test_andrew-ml.wav   # Test clone output — 22.7s inference, 637 KB
│   │   │   ├── clone_test_david-c.wav     # Test clone output — 14.2s inference, 631 KB
│   │   │   ├── clone_test_erik-adsa.wav   # Test clone output — 10.8s inference, 491 KB
│   │   │   └── clone_test_grant-llm.wav   # Test clone output — 12.4s inference, 553 KB
│   │   ├── documents/              # Lecture transcripts + teacher profile JSONs (Phase 2)
│   │   └── chroma_db/              # ChromaDB vector store
│   └── static/audio/               # Generated TTS audio files served via /static
│
├── frontend/                       # React SPA
│   ├── .env                        # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_BASE_URL
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                # ReactDOM.createRoot, wraps App in AuthProvider
│       ├── App.jsx                 # Router, route definitions, ProtectedRoute, PublicOnlyRoute
│       ├── supabase.js             # Unified Supabase client (real + mock fallback)
│       ├── index.css               # Full design system (atmospheric/glassmorphism)
│       ├── tokens.css              # CSS custom properties (colours, spacing, typography)
│       ├── widgets.css             # Reusable widget styles
│       ├── context/
│       │   └── AuthContext.jsx     # Global auth state (user, role, loading) via onAuthStateChange
│       ├── api/
│       │   └── api.js              # Axios/fetch wrapper for FastAPI backend
│       ├── pages/
│       │   ├── Login.jsx           # Role picker (Step 1) + email/password + Google OAuth (Step 2)
│       │   ├── Home.jsx            # Root redirect page
│       │   ├── OAuthCallback.jsx   # /auth/callback — handles Google OAuth redirect, upserts profile
│       │   └── dashboard/
│       │       ├── StudentHome.jsx         # Student landing: subject cards, recent activity
│       │       ├── SubjectSelection.jsx    # Subject → Teacher selection → AI chat interface (full flow)
│       │       ├── TeacherInteraction.jsx  # Embedded teacher chat (used within subject flow)
│       │       ├── StudentAnalytics.jsx    # Personal learning stats with Recharts
│       │       ├── Conversations.jsx       # Chat history viewer
│       │       ├── ClassData.jsx           # Teacher/Admin: class overview, student data
│       │       ├── Lectures.jsx            # Lecture upload & management
│       │       ├── Slides.jsx              # Slide deck viewer
│       │       ├── Archive.jsx             # Archived content
│       │       └── Voices.jsx              # Admin: custom TTS voice management
│       ├── components/
│       │   ├── Dashboard.jsx               # Stub/wrapper
│       │   ├── StudentChat.jsx             # Stub/wrapper
│       │   ├── chat/
│       │   │   ├── StudentChat.jsx         # Full chat UI with streaming, TTS button
│       │   │   └── MessageRenderer.jsx     # Renders text, code, citations, audio player
│       │   └── layout/
│       │       └── DashboardLayout.jsx     # Sidebar, header, theming wrapper for all dashboard routes
│
├── supabase/
│   └── migrations/
│       ├── 20231010000000_initial_schema.sql       # subjects, teachers, resources, chats, documents tables
│       ├── 20260531000000_proper_database.sql      # profiles table, voices table, handle_new_user trigger
│       └── 20260531010000_google_oauth_role_upsert.sql  # INSERT policy + ON CONFLICT DO UPDATE for OAuth
│
├── .env.example
├── context.md                      # This file
└── README.md
```

---

## 👨‍🏫 Teacher Clones

### Original Math Teachers (seeded from day 1)
| ID | Name | Subject | Voice ID | Style |
|---|---|---|---|---|
| `dr-rao` | Dr. Rao | Mathematics | `dr-rao` | Conceptual & Analytical |
| `prof-sharma` | Prof. Sharma | Mathematics | `prof-sharma` | Numerical-Driven |
| `ms-priya` | Mrs. Priya | Mathematics | `ms-priya` | Simple & Student-Friendly |

### New Clones (extracted from uploaded lecture videos — June 1, 2026)
| ID | Name | Subject ID | Voice ID | Style |
|---|---|---|---|---|
| `andrew-ml` | Andrew | `ml` | `andrew-ml` | Intuition-First, Mathematically Rigorous |
| `david-c` | David | `prog` | `david-c` | Systems-Level, Bottom-Up |
| `erik-adsa` | Erik | `ds` | `erik-adsa` | Problem-Pattern Recognition |
| `grant-llm` | Grant | `llm` | `grant-llm` | Cutting-Edge Research Communicator |

All 4 new clones have:
- Personality prompts hand-crafted from observed teaching styles
- Voices extracted, VAD-filtered, and EBU R128 normalized from their lecture videos
- Entries in `public.voices` Supabase table (upserted)
- Entries in `public.teachers` Supabase table (upserted)

### Subjects
| ID | Name | Notes |
|---|---|---|
| `math` | Mathematics | Original |
| `physics` | Physics | Original |
| `chem` | Chemistry | Original |
| `prog` | Programming | Updated: now includes C/Systems |
| `ml` | Machine Learning | Original |
| `ds` | Data Structures & Algorithms | Updated name |
| `llm` | Large Language Models | **NEW** — added for Grant |
| `mech` | Engineering Mechanics | Original |

---

## 🎤 Voice Cloning Pipeline (Phase 1 — COMPLETE)

### Architecture
```
Lecture Video (.mp4)
  │
  ▼ FFmpeg (Gyan build, via config.py PATH)
  │  - Seek to skip_intro_s (per-teacher, from audio analysis)
  │  - Extract 95s buffer as 16kHz mono PCM
  │  - Apply loudnorm (EBU R128: I=-16, TP=-1.5, LRA=11) + hard limiter
  │
  ▼ WebRTC VAD (webrtcvad-wheels)
  │  - Frame size: 30ms
  │  - Sustained-speech filter: requires >=10 consecutive voiced frames (300ms)
  │    (rejects music/noise bursts that trigger VAD in isolated frames)
  │  - Collect first 25s of qualifying voiced speech
  │
  ▼ Final loudnorm pass on output WAV
  │
  ▼ data/voices/{voice_id}.wav
       16kHz mono, ~782 KB, ~25s, EBU R128 normalized
```

### Per-Teacher Audio Analysis Results
| Teacher | Issue Found | Fix Applied |
|---|---|---|
| Andrew (ML) | Audio at -38 dB mean (nearly silent) | skip=8s + loudnorm → -16.8 dB |
| David (C) | 0-75s: title-card silence gap, then loud intro | skip=78s → jumps to first real speech |
| Erik (ADSA) | Clipping at 0 dB (distorted/overdriven) | skip=22s + loudnorm + limiter → -16.8 dB |
| Grant (LLM) | Already clean, continuous speech from 0s | skip=2s, no loudnorm needed |

### XTTS-v2 Clone Test Results (GPU — RTX 3050)
| Voice ID | Inference Time | File Size | Real-Time Factor |
|---|---|---|---|
| `andrew-ml` | 22.7s | 637 KB | 1.51x |
| `david-c` | 14.2s | 631 KB | 0.96x |
| `erik-adsa` | 10.8s | 491 KB | 0.94x |
| `grant-llm` | 12.4s | 553 KB | 0.96x |

RTF < 1.0 = generating audio faster than it plays back. Total: 60s for all 4 on CUDA.

---

## 🖥️ TTS Service — GPU Configuration

`tts_service.py` is updated to:
- **Auto-detect GPU** at startup and log GPU name + VRAM
- **Load XTTS-v2 on CUDA** when available (38.7s load time, one-time at startup)
- **Single ThreadPoolExecutor worker** on GPU (CUDA is not thread-safe for concurrent inference)
- **200-char chunks** on GPU (vs 250 on CPU) for better VRAM management
- **`torch.cuda.empty_cache()`** after each chunk to prevent VRAM fragmentation on 4GB cards

### Running on GPU (install notes)
```bash
# Must install CUDA torch explicitly — bare `pip install torch` gives CPU build:
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu124

# Verify:
python -c "import torch; print(torch.cuda.is_available())"  # Should print True
```

---

## 🔄 Detailed Workflows

### 1. Authentication Flow

**Email/Password:**
```
/login → role pick → enter credentials
→ supabase.auth.signInWithPassword({ email, password })
→ real Supabase (if credentials valid) OR mock fallback (@teacherclone.edu demo accounts)
→ SIGNED_IN event → AuthContext updates user + fetches role from profiles
→ setGlobalRole(verifiedRole) → navigate('/dashboard')
```

**Google OAuth:**
```
/login → role pick → "Continue with Google"
→ localStorage.setItem('pendingOAuthRole', role)  ← saved BEFORE redirect
→ supabase.auth.signInWithOAuth({ provider: 'google', redirectTo: '/auth/callback', queryParams: { role } })
→ Browser → Google sign-in → Supabase token exchange
→ Redirect to /auth/callback
→ OAuthCallback: getSession() → read pendingOAuthRole → upsert profiles table → navigate('/dashboard')
```

**Token Refresh**: Supabase JS SDK handles silently via `onAuthStateChange`.
**Logout**: `supabase.auth.signOut()` → clears localStorage (`userRole`, `mockUser`) → SIGNED_OUT event → user = null → redirect to `/login`.

### 2. Student Chat (AI Teacher) Flow
```
StudentHome → pick subject → SubjectSelection.jsx
→ Subject cards fetched from Supabase (subjects table)
→ Pick teacher clone (teachers table, filtered by subject_id)
→ TeacherInteraction.jsx / StudentChat.jsx
→ User types question → POST /chat/stream?teacher_id=X
→ Backend: chat_service.stream_answer()
    1. Fetch teacher personality_prompt from teacher_service
    2. Embed question with nomic-embed-text (Ollama)
    3. Query ChromaDB for top-3 relevant chunks (filtered by subject_id)
    4. Build RAG prompt: context + question + teacher persona
    5. POST to Ollama llama3 (stream: true) → yields SSE tokens
    6. Log question to Supabase chats table
→ Frontend: ReadableStream reads SSE → appends tokens to message buffer
→ Framer Motion renders token-by-token typing animation
→ Optional TTS button → triggers TTS flow
```

**Fallback**: If Ollama is unavailable → `_generate_with_gemini()` uses Gemini 2.5 Flash (non-streaming).

### 3. Document Ingestion Flow
```
Lectures.jsx / Resources section
→ User selects PDF or PPTX → POST /ingest/file (multipart)
→ ingest_service.py:
    PDF: PyMuPDF extracts text page by page
    PPTX: python-pptx extracts slide text frames
→ Text split into semantic chunks (~500 tokens each)
→ Each chunk embedded with nomic-embed-text → stored in ChromaDB
→ Document metadata (filename, chunk_count, subject_id) saved to Supabase documents table
→ Frontend shows progress / success state
```

### 4. Text-to-Speech / Voice Cloning Flow
```
Student clicks "Read aloud" on a chat message
→ POST /tts/speak { text, voice_id: "andrew-ml", language: "en" }
→ tts_service.py:
    1. Resolve speaker WAV: data/voices/{voice_id}.wav (falls back to any available voice)
    2. Split text into chunks (200 chars on GPU, 250 on CPU)
    3. For each chunk: XTTS-v2.tts_to_file(text, speaker_wav, language) on CUDA
       torch.cuda.empty_cache() after each chunk
    4. Concatenate chunk WAVs → final output WAV
→ FileResponse streams WAV to frontend
→ Frontend: HTMLAudioElement plays the cloned voice
```

### 5. Analytics Flow
```
StudentAnalytics.jsx mounts
→ GET /dashboard/analytics/{user_id}
→ dashboard_service.py queries Supabase chats table:
    - Message count over time
    - Topic/category distribution
    - Most active sessions
→ Returns JSON → Recharts renders line/bar/pie charts
→ User can filter by date range
```

### 6. Voice Management Flow (Admin)
```
Voices.jsx (admin only)
→ Admin uploads audio sample (WAV/MP3)
→ POST /tts/upload { voice_id, file }
→ tts_service.py saves audio to data/voices/
→ Metadata upserted into Supabase voices table
→ voice_id linked to a teacher record in teachers table
→ When that teacher's clone speaks, XTTS uses the cloned voice
```

### 7. Error Handling & Fallbacks

| Layer | Strategy |
|---|---|
| Supabase client | Real → mock proxy; any query error falls back to mock data silently |
| Chat AI | Ollama primary → Gemini 2.5 Flash fallback |
| TTS | XTTS-v2 with custom voice → first available voice fallback |
| Auth | Real Supabase → mock session (localStorage) for demo accounts |
| API responses | Standard `{ success, data?, error? }` shape; 401/403 trigger logout |

---

## 🗄️ Database Schema (Supabase / PostgreSQL)

All tables have Row Level Security (RLS) enabled.

### `public.profiles`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | References `auth.users(id)` ON DELETE CASCADE |
| `email` | TEXT | User email |
| `full_name` | TEXT | Display name |
| `role` | TEXT | `'student'` \| `'teacher'` \| `'admin'` (default: `'student'`) |
| `created_at` | TIMESTAMPTZ | |

**Trigger**: `handle_new_user` fires `AFTER INSERT ON auth.users` — inserts a profile row with `ON CONFLICT (id) DO UPDATE` so returning Google users get their role preserved.

**Policies**: Public SELECT, self-only UPDATE, self-only INSERT.

### `public.subjects`
| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `name` | TEXT | |
| `icon` | TEXT | Emoji or icon key |
| `description` | TEXT | |
| `enrolled_count` | INTEGER | |
| `created_at` | TIMESTAMPTZ | |

### `public.teachers`
| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `name` | TEXT | |
| `subject_id` | TEXT FK → subjects | |
| `teaching_style` | TEXT | |
| `description` | TEXT | |
| `avatar_url` | TEXT | |
| `personality_prompt` | TEXT | System prompt injected into chat |
| `voice_id` | TEXT | References voice in data/voices/ |
| `created_at` | TIMESTAMPTZ | |

### `public.resources`
| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `subject_id` | TEXT FK → subjects | |
| `title` | TEXT | |
| `type` | TEXT | `'pdf'`, `'pptx'`, `'note'`, etc. |
| `description` | TEXT | |
| `content` | TEXT | Raw extracted text |
| `created_at` | TIMESTAMPTZ | |

### `public.chats`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | auto-generated |
| `question` | TEXT | Student's question |
| `category` | TEXT | LLM-classified subject category |
| `time` | TEXT | Human-readable time string |
| `timestamp` | TIMESTAMPTZ | For ordering |
| `teacher_id` | TEXT FK → teachers | Which teacher clone was used |

### `public.documents`
| Column | Type | Notes |
|---|---|---|
| `file_id` | UUID PK | |
| `filename` | TEXT | |
| `chunk_count` | INTEGER | Number of ChromaDB chunks |
| `timestamp` | TIMESTAMPTZ | |
| `status` | TEXT | `'ingested'`, `'error'`, etc. |
| `subject_id` | TEXT FK → subjects | |

### `public.voices`
| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | Matches voice_id in data/voices/ |
| `filename` | TEXT | Audio file name |
| `created_at` | TIMESTAMPTZ | |

**Current records**: `dr-rao`, `ms-priya`, `prof-sharma`, `andrew-ml`, `david-c`, `erik-adsa`, `grant-llm`

**Policies**: Public SELECT; admin-only INSERT (checked via `profiles.role = 'admin'`).

---

## 🔐 Security Notes

- **Google Client ID**: `26174274615-fnhavqrko3qmncf7pqjcvl1qfre12q7m.apps.googleusercontent.com`
- **Supabase Project**: `yowyjembzbekkkvmhhie.supabase.co`
- **Authorized redirect URI** (Google Cloud Console): `https://yowyjembzbekkkvmhhie.supabase.co/auth/v1/callback`
- **Allowed redirect URL** (Supabase): `http://localhost:5173`
- The backend uses `SUPABASE_SERVICE_ROLE_KEY` (never exposed to the frontend).
- The frontend uses `VITE_SUPABASE_ANON_KEY` (publishable key, RLS enforced).
- All dashboard routes are behind `ProtectedRoute` — unauthenticated users are always redirected to `/login`.

---

## 📋 Quick Reference

### Start Commands
| Task | Command |
|---|---|
| Start backend | `uvicorn main:app --reload` (in `backend/`) |
| Start frontend | `npm run dev` (in `frontend/`) |
| Run Ollama | `ollama serve` |
| Pull Ollama models | `ollama pull llama3 nomic-embed-text` |
| Run DB migrations | Paste SQL files into Supabase SQL Editor chronologically |

### Voice Cloning Pipeline Commands
| Task | Command (run from `backend/`) |
|---|---|
| Extract teacher voices | `$env:PYTHONIOENCODING="utf-8"; .\venv\Scripts\python.exe scripts/extract_teacher_voices.py` |
| Test clone quality | `$env:PYTHONIOENCODING="utf-8"; .\venv\Scripts\python.exe scripts/test_clone.py` |
| Check voice quality | `$env:PYTHONIOENCODING="utf-8"; .\venv\Scripts\python.exe scripts/check_voice_quality.py` |
| Transcribe lectures (Phase 2) | `$env:PYTHONIOENCODING="utf-8"; .\venv\Scripts\python.exe scripts/transcribe_lectures.py --model medium` |
| Ingest transcripts (Phase 2) | `$env:PYTHONIOENCODING="utf-8"; .\venv\Scripts\python.exe scripts/ingest_lecture_transcripts.py` |

> **Windows Note**: Always set `$env:PYTHONIOENCODING="utf-8"` before running backend scripts to avoid CP1252 encoding errors in the terminal.

### Install Notes
```bash
# Backend venv (from backend/):
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# CUDA torch MUST be installed separately (requirements.txt has the index-url):
.\venv\Scripts\pip.exe install torch torchaudio --index-url https://download.pytorch.org/whl/cu124

# Verify GPU:
.\venv\Scripts\python.exe -c "import torch; print('CUDA:', torch.cuda.is_available(), '| GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'N/A')"
```

### Demo Accounts (Mock Path — no real Supabase needed)
| Role | Email | Password |
|---|---|---|
| Student | `student@teacherclone.edu` | `password123` |
| Teacher | `dr.rao@teacherclone.edu` | `password123` |
| Admin | `admin@teacherclone.edu` | `password123` |

---

## 🗺️ What's Done vs What's Next

### Phase 1 — Voice Cloning ✅ COMPLETE
- [x] Voice extraction pipeline (`voice_extraction_service.py`) with per-teacher audio tuning
- [x] WebRTC VAD sustained-speech filter (rejects music/noise)
- [x] EBU R128 loudnorm normalization on all voice references
- [x] CUDA PyTorch (`torch 2.6.0+cu124`) installed and verified on RTX 3050
- [x] XTTS-v2 running on GPU with VRAM-safe chunking
- [x] All 4 teacher voices cloned and tested (60s total on GPU)
- [x] `teacher_service.py` updated with 4 new teachers + `llm` subject (upsert-safe seeding)
- [x] Supabase `public.voices` + `public.teachers` + `public.subjects` upserted

### Phase 2 — Transcription & RAG ⏳ READY TO RUN
- [ ] Run `transcribe_lectures.py` — Whisper transcribes each MP4 locally
  - Outputs: `data/documents/{voice_id}_transcript.txt`
  - Ollama extracts personality prompts from transcripts
  - Profiles saved to `data/documents/{voice_id}_profile.json`
- [ ] Run `ingest_lecture_transcripts.py` — chunks transcripts → ChromaDB
  - Subject mapping: andrew-ml→ml, david-c→prog, erik-adsa→ds, grant-llm→ml (llm subject coming)
  - Records in Supabase `public.documents`

### Phase 3 — Feature Extraction (Future)
- [ ] Extract teaching-specific features from transcripts (vocabulary level, analogy patterns, pacing)
- [ ] Use features to auto-generate/refine personality prompts per teacher
- [ ] Fine-tune or adapt XTTS-v2 for longer-form coherent speech

---

## 📚 Additional Resources
- FastAPI: https://fastapi.tiangolo.com/
- ChromaDB: https://docs.trychroma.com/
- React: https://react.dev/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase JS: https://supabase.com/docs/reference/javascript/
- Ollama: https://ollama.ai/
- Coqui TTS / XTTS-v2: https://github.com/coqui-ai/TTS
- Gemini API: https://ai.google.dev/
- PyTorch CUDA builds: https://download.pytorch.org/whl/cu124

---

**Maintained By**: TeacherClone Team
**License**: MIT
