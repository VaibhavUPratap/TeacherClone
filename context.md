# TeacherClone - Project Context

**Last Updated**: May 31, 2026

## 📋 Project Overview

TeacherClone is an AI‑powered educational tutoring assistant that helps students learn through intelligent conversations. It uses Retrieval‑Augmented Generation (RAG) to provide accurate, context‑aware answers based on uploaded study materials (PDFs/textbooks). The application features real‑time streaming, local text‑to‑speech, analytics dashboards, and secure authentication.

**Repository**: VaibhavUPratap/TeacherClone

---

## 🏗️ Architecture Overview

### Technology Stack

#### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Vector Database**: ChromaDB (local RAG for document retrieval)
- **Database**: MongoDB (historical data & user interactions)
- **AI Models**:
  - Ollama (llama3 & nomic-embed-text for local inference)
  - OpenAI GPT‑4o (fallback)
- **Text‑to‑Speech**: Coqui XTTS‑v2 (local inference)
- **Authentication**: Firebase Admin SDK + JWT
- **Password Hashing**: bcrypt via passlib

#### Frontend
- **Framework**: React 18 (with JSX)
- **Build Tool**: Vite 5 (fast dev server & bundler)
- **State Management**: React Hooks & Context API
- **Routing**: React Router v7
- **Backend Integration**: Supabase.js, Axios / Fetch
- **UI Libraries**:
  - Framer Motion (animations)
  - Lucide React (icons)
  - Recharts (charts/analytics)
- **Styling**: CSS with glassmorphism design

#### Infrastructure
- **Authentication**: Firebase & Supabase
- **Ollama**: Running locally on `http://localhost:11434`
- **API Base**: `http://localhost:8000` (development)

---

## 📁 Directory Structure

```
TeacherClone/
├── backend/                 # FastAPI server
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── routers/            # API route definitions
│   ├── services/           # Business logic
│   ├── schemas/            # Pydantic models
│   ├── data/               # Local storage
│   └── static/audio/       # Generated TTS files
│
├── frontend/                # React SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── widgets.css
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Home.jsx
│       │   └── dashboard/
│       │       ├── TeacherInteraction.jsx
│       │       ├── SubjectSelection.jsx
│       │       ├── StudentAnalytics.jsx
│       │       ├── Conversations.jsx
│       │       ├── Resources.jsx
│       │       ├── Lectures.jsx
│       │       ├── Slides.jsx
│       │       ├── ClassData.jsx
│       │       └── Archive.jsx
│       ├── components/
│       │   ├── Dashboard.jsx
│       │   ├── StudentChat.jsx
│       │   └── chat/
│       │       ├── StudentChat.jsx
│       │       └── MessageRenderer.jsx
│       ├── layout/
│       │   └── DashboardLayout.jsx
│       ├── api/
│       │   └── api.js            # HTTP client wrapper
│       ├── context/
│       │   └── AuthContext.jsx   # Global auth state
│       └── supabase.js           # Supabase client config
│
├── supabase/                # Supabase configuration (optional)
├── .env.example
├── README.md
└── context.md               # This documentation file
```

---

## 🎨 Frontend Architecture & Working

### Component Hierarchy
| Layer | Description |
|-------|-------------|
| **Pages** | Top‑level route components (Login, Home, Dashboard sections). Each page composes layout and specific feature components. |
| **Layout** | `DashboardLayout.jsx` provides a consistent header, sidebar, and theming wrapper for all dashboard pages. |
| **Feature Components** | Individual UI pieces such as `TeacherInteraction.jsx`, `SubjectSelection.jsx`, `StudentAnalytics.jsx`, etc. They focus on a single responsibility and receive data via props or context. |
| **Reusable UI** | Buttons, cards, charts, and modal components live in `components/` and are styled via `widgets.css` and `index.css`. |
| **Chat Sub‑tree** | `components/chat/StudentChat.jsx` handles the chat UI, while `MessageRenderer.jsx` formats each message (text, audio, citations). |
| **Context** | `AuthContext.jsx` exposes authentication state (user, token, logout) to any component via React Context API. |
| **API Layer** | `api/api.js` centralises all HTTP calls (Axios/Fetch) to the FastAPI backend, handling auth headers and error handling. |

### State Management
- **Global Auth State** – `AuthContext` supplies `user`, `accessToken`, and helper functions (`login`, `logout`). Components subscribe via `useContext(AuthContext)`. 
- **Local UI State** – Individual components manage their own UI state (selected subject, chart filters) using `useState` and `useReducer` when complexity grows. 
- **Data Fetching** – `useEffect` triggers API calls on mount; responses are stored in component state or lifted to context if shared across pages. 
- **Streaming Responses** – Chat component initiates a `fetch` request with `ReadableStream` to receive token‑by‑token data. Incoming tokens are appended to a message buffer, creating a smooth typing animation powered by Framer Motion. 

### Routing
- **Public Routes** – `/login` and `/register` are accessible without authentication.
- **Protected Routes** – All `/dashboard/*` routes are wrapped by `RequireAuth` HOC that redirects unauthenticated users to `/login`.
- **Dynamic Segments** – Future extensions may include `/dashboard/course/:courseId` using `useParams` for per‑course views.

### Styling & Design System
- **Glassmorphism** – Base containers use a semi‑transparent backdrop with `backdrop-filter: blur(10px)` for a modern frosted‑glass look.
- **Theme Variables** – Colors, font families (Inter from Google Fonts), and spacing are defined in CSS custom properties (`--primary`, `--bg`, `--radius`).
- **Micro‑animations** – Framer Motion adds subtle hover scale, fade‑in, and slide‑up effects for cards and buttons, improving perceived performance.

---

## 🔄 Detailed Workflows

Below are the end‑to‑end flows that power the application. Each flow starts at the frontend, traverses the API layer, and terminates in a backend service.

### 1. Authentication Flow
```
User visits /login → Enters credentials → Frontend calls POST /auth/login → Backend validates via Firebase Admin SDK → JWT issued → Frontend stores token in AuthContext → Subsequent API calls include Authorization: Bearer <jwt>
```
- **Refresh** – `POST /auth/refresh` renews token before expiry.
- **Logout** – `POST /auth/logout` revokes server‑side session and clears context.

### 2. Chat (AI Teacher) Flow
```
User types a question in StudentChat.jsx → Frontend POST /chat/message (streaming) → chat_service.py retrieves relevant context vectors via vector_service.py → Calls Ollama (or fallback GPT‑4o) → Streams response tokens back → Frontend renders tokens in real‑time using MessageRenderer.jsx → Optional TTS button triggers TTS flow.
```
- **State** – Current conversation stored in MongoDB; `GET /chat/history/{user_id}` loads prior messages.
- **Cancellation** – AbortController can cancel the stream if user navigates away.

### 3. Document Ingestion Flow
```
User uploads PDF via Resources.jsx → Frontend POST /ingest/upload (multipart) → ingest_service.py extracts text with PyMuPDF → Text split into semantic chunks → Embeddings generated via nomic‑embed-text (Ollama) → Vectors stored in ChromaDB → Metadata (docId, page) attached for later retrieval.
```
- **Progress UI** – Upload component shows a progress bar; backend returns ingestion status.

### 4. Text‑to‑Speech (TTS) Flow
```
User clicks "Read aloud" on a chat message → Frontend POST /tts/generate with text payload → tts_service.py runs Coqui XTTS‑v2 → Audio file saved to backend/static/audio/ → Endpoint GET /tts/audio/{audio_id} returns URL → Frontend streams audio via HTMLAudioElement.
```
- **Caching** – Generated audio IDs are stored in MongoDB to avoid recomputation.

### 5. Analytics Dashboard Flow
```
Dashboard mounts StudentAnalytics.jsx → Frontend GET /dashboard/analytics/{user_id} → dashboard_service.py aggregates interaction metrics from MongoDB (message counts, topics, timestamps) → Returns JSON payload → Recharts renders line/bar charts; filters allow date range selection.
```
- **Real‑time Updates** – Optional WebSocket can push new analytics data when a session ends.

### 6. Resource Listing Flow
```
User navigates to Resources.jsx → Frontend GET /ingest/documents/{user_id} → ingest_service.py queries MongoDB for uploaded documents → Returns list with metadata (title, size, page count) → UI displays cards with preview & delete option (DELETE /ingest/document/{doc_id}).
```

### 7. Error Handling & Fallbacks
- API responses include a standard `{ success: boolean, data?: any, error?: string }` shape.
- Frontend globally intercepts 401/403 to trigger logout.
- Network errors display toast notifications via a reusable `Toast` component.

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| Install backend deps | `pip install -r backend/requirements.txt` |
| Install frontend deps | `npm install` (in `frontend/`) |
| Start backend | `uvicorn backend/main:app --reload` |
| Start frontend | `npm run dev` (in `frontend/`) |
| Build frontend | `npm run build` (in `frontend/`) |
| Run Ollama | `ollama serve` |
| Pull Ollama models | `ollama pull llama3 nomic-embed-text` |

---

## 📚 Additional Resources
- FastAPI Docs: https://fastapi.tiangolo.com/
- ChromaDB Guide: https://docs.trychroma.com/
- React Documentation: https://react.dev/
- Ollama Models: https://ollama.ai/
- Coqui TTS: https://github.com/coqui-ai/TTS
- Firebase Admin SDK: https://firebase.google.com/docs/admin/setup

---

**Maintained By**: TeacherClone Team
**License**: MIT
