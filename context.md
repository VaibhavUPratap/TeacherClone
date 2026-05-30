# TeacherClone — Project Context

**Last Updated**: May 31, 2026

---

## 📋 Project Overview

TeacherClone is an AI-powered educational tutoring platform. Students select a subject, choose an AI teacher clone, and learn through real-time streaming conversations grounded in uploaded lecture materials (RAG). Teachers and admins manage content through a separate dashboard view. The app features Google OAuth + email/password auth via Supabase, local text-to-speech using Coqui XTTS-v2, analytics dashboards, and role-based access control.

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
- **Text-to-Speech**: Coqui XTTS-v2 (local inference via `coqui-tts`)
- **Authentication**: Supabase Auth (JWT) verified by the backend
- **Password Hashing**: bcrypt via passlib
- **File Handling**: PyMuPDF (PDF text extraction), python-pptx (PPTX slide extraction)

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

---

## 📁 Directory Structure

```
TeacherClone/
├── backend/                        # FastAPI server
│   ├── main.py                     # App entry point, middleware, router mounting
│   ├── config.py                   # Settings (pydantic-settings), Supabase client init, FFmpeg path
│   ├── requirements.txt
│   ├── .env                        # Backend secrets (GEMINI_API_KEY, SUPABASE_URL, etc.)
│   ├── routers/
│   │   ├── auth.py                 # POST /auth/login, /auth/logout, /auth/refresh
│   │   ├── chat.py                 # POST /chat/message, GET /chat/stream, GET /chat/history
│   │   ├── ingest.py               # POST /ingest/file, GET /ingest/documents, DELETE /ingest/document/{id}
│   │   ├── tts.py                  # POST /tts/generate, GET /tts/audio/{id}
│   │   └── dashboard.py            # GET /dashboard/analytics/{user_id}
│   ├── services/
│   │   ├── auth_service.py         # JWT creation/verification, Supabase user lookup
│   │   ├── chat_service.py         # RAG pipeline: embed → ChromaDB → Ollama/Gemini stream
│   │   ├── teacher_service.py      # Teacher clone CRUD, personality prompt management, DB seeding
│   │   ├── ingest_service.py       # PDF/PPTX text extraction, chunking, ChromaDB ingestion
│   │   ├── vector_service.py       # ChromaDB wrapper (add, query, delete collections)
│   │   ├── tts_service.py          # Coqui XTTS-v2 inference, audio file management
│   │   ├── dashboard_service.py    # Aggregates Supabase chat metrics for analytics
│   │   └── knowledge_base.py       # Static keyword-based fast-path answer lookup
│   ├── schemas/                    # Pydantic request/response models
│   ├── data/                       # Local ChromaDB persistence
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

## 🎨 Frontend Architecture & Working

### Authentication Flow (Supabase-based)

The auth system uses a **unified Supabase proxy** (`supabase.js`) that combines a real Supabase client with a mock fallback so the app works without live credentials.

```
User opens app
  → AuthContext mounts → supabase.auth.onAuthStateChange() fires INITIAL_SESSION
  → If session exists: setUser(session.user), fetch role from profiles table
  → If no session: setUser(null), redirect to /login
```

**Login page is a 2-step flow:**

- **Step 1 — Role Picker**: User selects Student, Teacher, or Admin (stored in React state)
- **Step 2 — Auth Form**: Email/password form + "Continue with Google" button

**Email/Password sign-in:**
```
Role picked → enter email + password → supabase.auth.signInWithPassword()
→ SIGNED_IN event fires → AuthContext sets user + fetches role from profiles
→ navigate('/dashboard') → DashboardIndex shows StudentHome or ClassData based on role
```

**Google OAuth sign-in:**
```
Role picked → click "Continue with Google"
→ pendingOAuthRole saved to localStorage
→ supabase.auth.signInWithOAuth({ provider: 'google', redirectTo: '/auth/callback' })
→ Browser redirects to Google → user authenticates
→ Supabase exchanges code → redirects to /auth/callback
→ OAuthCallback.jsx reads pendingOAuthRole from localStorage (most reliable source)
→ Upserts profiles table: { id, email, full_name, role }
→ navigate('/dashboard')
```

**Auth state is driven exclusively by `onAuthStateChange`** — no parallel `getSession()` call, eliminating race conditions where ProtectedRoute saw `user === null` before the session resolved.

### Role-Based Routing

| Route | Access | Renders |
|---|---|---|
| `/login` | Public only (redirect to dashboard if logged in) | Login.jsx |
| `/auth/callback` | Always public (mid-OAuth) | OAuthCallback.jsx |
| `/dashboard` (index) | Protected | `ClassData` if teacher/admin, `StudentHome` if student |
| `/dashboard/subjects` | Protected | SubjectSelection.jsx |
| `/dashboard/interaction` | Protected | TeacherInteraction.jsx |
| `/dashboard/conversations` | Protected | Conversations.jsx |
| `/dashboard/lectures` | Protected | Lectures.jsx |
| `/dashboard/slides` | Protected | Slides.jsx |
| `/dashboard/data` | Protected | ClassData.jsx |
| `/dashboard/analytics` | Protected | StudentAnalytics.jsx |
| `/dashboard/archive` | Protected | Archive.jsx |
| `/dashboard/voices` | Protected | Voices.jsx |

### Supabase Client (`supabase.js`) — Unified Proxy

The exported `supabase` object is a smart proxy:

1. **`_unifiedListeners`** — a global `Set` of `onAuthStateChange` callbacks. Both the real Supabase client's auth events and mock auth calls (`signInWithPassword`, `signInWithOAuth`, `signUp`, `signOut`) all call `_notifyListeners()` so every subscriber is always notified regardless of which code path handled the auth.

2. **Mock fallback** — if `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are missing, or for demo `@teacherclone.edu` emails, the mock client handles auth using `localStorage` (`mockUser`, `userRole`) without any network calls.

3. **Role detection** (mock path) — only checks the **local part** of the email (before `@`) to avoid matching `student@teacherclone.edu` as a teacher due to the domain containing "teacher".

4. **`supabase.from(table)`** — uses real client unless `localStorage.mockUser` exists (mock session active), with a query builder proxy that falls back to mock data on any real query error.

### State Management

- **Global Auth State** — `AuthContext` provides `{ user, role, loading, setRole }`. `loading` stays `true` until the first `onAuthStateChange` event fires, preventing children from rendering prematurely.
- **Local UI State** — each page manages its own state with `useState`/`useReducer`.
- **Streaming Responses** — `fetch` with `ReadableStream` reads SSE tokens from `/chat/stream`, appended to a message buffer with Framer Motion typing animations.
- **AbortController** — used to cancel in-flight streams when the user navigates away.

### Design System

- **Atmospheric glassmorphism** — semi-transparent cards, radial bloom gradients, warm amber/terracotta palette using OKLCH colour space
- **Typography** — DM Sans (display/body), Inter (mono), loaded from Google Fonts
- **Micro-animations** — Framer Motion hover scale, fade-in, slide-up on all interactive elements
- **CSS custom properties** — `--color-paper`, `--color-ink`, `--color-accent`, `--space-*`, `--radius-*`, `--font-*` defined in `tokens.css`

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
| `voice_id` | TEXT | References custom Coqui voice |
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
| `subject_id` | TEXT FK → subjects | Added in migration 2 |

### `public.voices`
| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `filename` | TEXT | Audio file name for Coqui TTS |
| `created_at` | TIMESTAMPTZ | |

**Policies**: Public SELECT; admin-only INSERT (checked via `profiles.role = 'admin'`).

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

### 4. Text-to-Speech (TTS) Flow
```
Student clicks "Read aloud" on a chat message
→ POST /tts/generate { text, voice_id? }
→ tts_service.py: Coqui XTTS-v2 runs inference
    If voice_id provided: uses cloned teacher voice from static/audio/voices/
    Otherwise: uses default XTTS speaker
→ Audio saved to backend/static/audio/{audio_id}.wav
→ Response: { audio_url: "/static/audio/{audio_id}.wav" }
→ Frontend: HTMLAudioElement streams the file
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
→ POST /tts/upload_voice { audio_file, voice_name }
→ tts_service.py saves audio to static/audio/voices/
→ Metadata inserted into Supabase voices table
→ voice_id is linked to a teacher record in teachers table
→ When that teacher's clone speaks, XTTS uses the cloned voice
```

### 7. Error Handling & Fallbacks

| Layer | Strategy |
|---|---|
| Supabase client | Real → mock proxy; any query error falls back to mock data silently |
| Chat AI | Ollama primary → Gemini 2.5 Flash fallback |
| TTS | XTTS-v2 with custom voice → default speaker fallback |
| Auth | Real Supabase → mock session (localStorage) for demo accounts |
| API responses | Standard `{ success, data?, error? }` shape; 401/403 trigger logout |

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

| Task | Command |
|---|---|
| Install backend deps | `pip install -r backend/requirements.txt` (in `backend/`) |
| Install frontend deps | `npm install` (in `frontend/`) |
| Start backend | `uvicorn main:app --reload` (in `backend/`) |
| Start frontend | `npm run dev` (in `frontend/`) |
| Build frontend | `npm run build` (in `frontend/`) |
| Run Ollama | `ollama serve` |
| Pull Ollama models | `ollama pull llama3 nomic-embed-text` |
| Run DB migrations | Paste SQL files into Supabase SQL Editor in chronological order |

### Demo Accounts (Mock Path — no real Supabase needed)
| Role | Email | Password |
|---|---|---|
| Student | `student@teacherclone.edu` | `password123` |
| Teacher | `dr.rao@teacherclone.edu` | `password123` |
| Admin | `admin@teacherclone.edu` | `password123` |

---

## 📚 Additional Resources
- FastAPI: https://fastapi.tiangolo.com/
- ChromaDB: https://docs.trychroma.com/
- React: https://react.dev/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase JS: https://supabase.com/docs/reference/javascript/
- Ollama: https://ollama.ai/
- Coqui TTS: https://github.com/coqui-ai/TTS
- Gemini API: https://ai.google.dev/

---

**Maintained By**: TeacherClone Team
**License**: MIT
