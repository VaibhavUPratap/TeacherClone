# TeacherClone - Project Context

**Last Updated**: May 20, 2026

## 📋 Project Overview

TeacherClone is an AI-powered educational tutoring assistant that helps students learn through intelligent conversations. It uses Retrieval-Augmented Generation (RAG) to provide accurate, context-aware answers based on uploaded study materials (PDFs/textbooks). The application features real-time streaming, local text-to-speech, analytics dashboards, and secure authentication.

**Repository**: VaibhavUPratap/TeacherClone  
**Git Root**: `D:\Projects\TeacherClone.worktrees\agents-create-context-md-file-update`

---

## 🏗️ Architecture Overview

### Technology Stack

#### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Vector Database**: ChromaDB (local RAG for document retrieval)
- **Database**: MongoDB (historical data & user interactions)
- **AI Models**:
  - Ollama (llama3 & nomic-embed-text for local inference)
  - OpenAI GPT-4o (fallback)
- **Text-to-Speech**: Coqui XTTS-v2 (local inference)
- **Authentication**: Firebase Admin SDK + JWT
- **Password Hashing**: bcrypt via passlib

#### Frontend
- **Framework**: React 18.3.1 (with JSX)
- **Build Tool**: Vite 5.4.10
- **State Management**: React Hooks & Context API
- **Routing**: React Router v7.14.2
- **Backend Integration**: Supabase.js, Axios/Fetch
- **UI Libraries**:
  - Framer Motion (animations)
  - Lucide React (icons)
  - Recharts (charts/analytics)
- **Styling**: CSS (glassmorphism design)

#### Infrastructure
- **Authentication**: Firebase & Supabase
- **Ollama**: Running locally on `http://localhost:11434`
- **API Base**: `http://localhost:8000` (development)

---

## 📁 Directory Structure

```
TeacherClone/
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── config.py               # Configuration & environment setup
│   ├── requirements.txt         # Python dependencies
│   │
│   ├── routers/                # API endpoint definitions
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── chat.py             # Chat/conversational endpoints
│   │   ├── ingest.py           # Document upload & ingestion
│   │   ├── dashboard.py        # Analytics & dashboard data
│   │   └── tts.py              # Text-to-speech endpoints
│   │
│   ├── services/               # Business logic
│   │   ├── auth_service.py     # User authentication
│   │   ├── chat_service.py     # Chat orchestration
│   │   ├── ingest_service.py   # Document processing & chunking
│   │   ├── knowledge_base.py   # RAG & vector search
│   │   ├── vector_service.py   # ChromaDB interaction
│   │   ├── teacher_service.py  # Teacher/AI service logic
│   │   ├── tts_service.py      # Text-to-speech synthesis
│   │   └── dashboard_service.py # Analytics & metrics
│   │
│   ├── schemas/                # Pydantic models (request/response)
│   │   ├── auth_schema.py
│   │   ├── chat_schema.py
│   │   ├── ingest_schema.py
│   │   ├── dashboard_schema.py
│   │   └── tts_schema.py
│   │
│   ├── data/                   # Local data storage
│   ├── scratch/                # Experimental/test files
│   └── static/audio/           # Generated TTS audio files
│
├── frontend/
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Node dependencies & scripts
│   ├── package-lock.json
│   │
│   └── src/
│       ├── main.jsx            # React app entry
│       ├── App.jsx             # Root component
│       ├── index.css           # Global styles
│       ├── widgets.css         # Component styles
│       │
│       ├── pages/
│       │   ├── Login.jsx       # Login/auth page
│       │   ├── Home.jsx        # Landing page
│       │   └── dashboard/
│       │       ├── TeacherInteraction.jsx    # Chat with AI teacher
│       │       ├── SubjectSelection.jsx      # Subject picker
│       │       ├── StudentAnalytics.jsx      # Learning analytics
│       │       ├── Conversations.jsx         # Chat history
│       │       ├── Resources.jsx             # Uploaded materials
│       │       ├── Lectures.jsx              # Course lectures
│       │       ├── Slides.jsx                # Presentation slides
│       │       ├── ClassData.jsx             # Class information
│       │       └── Archive.jsx               # Archived content
│       │
│       ├── components/
│       │   ├── Dashboard.jsx            # Main dashboard layout
│       │   ├── StudentChat.jsx          # Chat interface (duplicate?)
│       │   └── chat/
│       │       ├── StudentChat.jsx      # Chat component
│       │       └── MessageRenderer.jsx  # Message formatting
│       │
│       ├── layout/
│       │   └── DashboardLayout.jsx      # Dashboard layout wrapper
│       │
│       ├── api/
│       │   └── api.js                   # HTTP client & API calls
│       │
│       ├── context/
│       │   └── AuthContext.jsx          # Authentication context
│       │
│       └── supabase.js                  # Supabase client config
│
├── supabase/                   # Supabase configuration (if used)
├── .env.example               # Environment variables template
├── README.md                  # Project README
├── LICENSE                    # MIT License
├── docs/
│   └── context.md            # This file (comprehensive documentation)
└── context.md                # Reference copy in root
```

---

## 🔑 Key Features

### 1. **Intelligent RAG System**
- Document ingestion (PDFs via PyMuPDF)
- Semantic chunking for optimal context
- Vector embeddings via nomic-embed-text (Ollama)
- ChromaDB for local vector storage
- Cosine similarity search for relevant context retrieval

### 2. **Topic Guard**
- Validates queries are educational in nature
- Redirects off-topic conversations politely
- Maintains focus on learning objectives

### 3. **Local Text-to-Speech**
- Coqui XTTS-v2 for realistic voice synthesis
- Runs locally (no external TTS API calls)
- Audio files stored in `backend/static/audio/`
- Reduces latency and respects privacy

### 4. **Analytics Dashboard**
- Learning progress tracking
- Weak area identification
- Recent activity visualization (Recharts)
- Interaction metrics

### 5. **Secure Authentication**
- Firebase Authentication
- JWT tokens for API security
- Password hashing with bcrypt
- Session management

### 6. **Real-time Streaming**
- Token-by-token response streaming
- Natural conversation feel
- Low-latency interactions

---

## 🔌 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token

### Chat (`/chat`)
- `POST /chat/message` - Send message to AI teacher (streaming)
- `GET /chat/history/{user_id}` - Retrieve chat history
- `DELETE /chat/clear/{user_id}` - Clear chat history

### Document Ingestion (`/ingest`)
- `POST /ingest/upload` - Upload PDF/document
- `GET /ingest/documents/{user_id}` - List user documents
- `DELETE /ingest/document/{doc_id}` - Delete document

### Text-to-Speech (`/tts`)
- `POST /tts/generate` - Generate audio from text
- `GET /tts/audio/{audio_id}` - Retrieve generated audio

### Dashboard (`/dashboard`)
- `GET /dashboard/analytics/{user_id}` - Get user analytics
- `GET /dashboard/activity/{user_id}` - Get recent activity
- `GET /dashboard/progress` - Get learning progress metrics

---

## ⚙️ Configuration & Environment

### Backend Environment Variables (`.env`)
```env
# OpenAI
OPENAI_API_KEY=your_key

# JWT Security
JWT_SECRET=your_secret

# Firebase Admin SDK
FIREBASE_CREDENTIALS_PATH=backend/firebase_admin.json

# Ollama (local AI)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3

# Frontend Integration
VITE_API_BASE_URL=http://localhost:8000
```

### Required Ollama Models
```bash
ollama pull llama3           # Main LLM
ollama pull nomic-embed-text # Embeddings
```

### Configuration File (`backend/config.py`)
- Loads environment variables via `python-dotenv`
- Initializes Supabase client
- Sets up MongoDB connection (if configured)
- Configures Ollama connection parameters

---

## 🚀 Running the Application

### Prerequisites
- Python 3.10+
- Node.js 18+
- Ollama installed and running
- MongoDB instance (local or Atlas)
- Firebase project with admin credentials

### Backend Startup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs on: `http://localhost:8000`

### Frontend Startup
```bash
cd frontend
npm install
npm run dev
```
App runs on: `http://localhost:5173` (Vite default)

### Build for Production
**Frontend**:
```bash
npm run build  # Creates optimized dist/
npm run preview
```

---

## 📦 Dependencies Summary

### Backend (Python)
| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `uvicorn` | ASGI server |
| `chromadb` | Vector database |
| `pymongo` | MongoDB driver |
| `openai` | OpenAI API client |
| `supabase` | Supabase client |
| `TTS` (Coqui) | Text-to-speech |
| `torch` | Deep learning (for TTS) |
| `python-jose` | JWT handling |
| `passlib[bcrypt]` | Password hashing |
| `pymupdf` | PDF parsing |
| `httpx` | Async HTTP client |
| `pydantic` | Data validation |

### Frontend (Node)
| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-router-dom` | Client routing |
| `@supabase/supabase-js` | Supabase client |
| `firebase` | Firebase integration |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `recharts` | Charts/visualization |
| `vite` | Build tool |

---

## 🔄 Data Flow

### Chat Flow
```
User Input 
  → Frontend (StudentChat.jsx) 
  → API POST /chat/message 
  → chat_service.py (orchestration)
  → vector_service.py (retrieve context from ChromaDB)
  → chat_service.py (call Ollama/GPT-4o)
  → Response streaming (token-by-token)
  → Frontend renders in real-time
```

### Document Ingestion Flow
```
User uploads PDF 
  → Frontend (Resources.jsx) 
  → API POST /ingest/upload 
  → ingest_service.py (extract & chunk text)
  → vector_service.py (generate embeddings)
  → ChromaDB (store vectors)
```

### TTS Flow
```
"Read aloud" button clicked 
  → Frontend 
  → API POST /tts/generate 
  → tts_service.py (Coqui XTTS-v2)
  → Audio file generated 
  → Served from /static/audio/
  → Frontend plays audio
```

---

## 🛡️ Security Considerations

1. **CORS Middleware**: Currently allows all origins (`allow_origins=["*"]`) — should be restricted in production
2. **Firebase Auth**: Validates users server-side
3. **JWT Tokens**: Sign requests to API
4. **Password Security**: bcrypt with passlib
5. **Environment Variables**: Sensitive keys in `.env` (not committed)

---

## 🐛 Known Issues / TODOs

- ✅ CORS configuration too permissive (needs production scoping)
- ⚠️ Duplicate `StudentChat.jsx` in components/ (clean up)
- ⚠️ MongoDB connection not yet documented
- ⚠️ Error handling could be more robust

---

## 📝 Notes for Development

### Backend Service Pattern
- Services handle business logic (auth_service, chat_service, etc.)
- Routers define HTTP endpoints and delegate to services
- Schemas validate input/output with Pydantic

### Frontend Component Structure
- Pages: Full-page components (Login, Home, Dashboard sections)
- Components: Reusable UI components
- Context: Global state (AuthContext)
- API: HTTP client wrapper

### Streaming Implementation
- FastAPI supports SSE (Server-Sent Events) for streaming
- Frontend uses `fetch()` with response body streaming
- Messages rendered incrementally for better UX

### Vector Search Optimization
- ChromaDB uses cosine similarity by default
- Results filtered by relevance threshold
- Metadata (document ID, page #) attached to vectors

---

## 🔗 Related Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [ChromaDB Guide](https://docs.trychroma.com/)
- [React Documentation](https://react.dev/)
- [Ollama Models](https://ollama.ai/)
- [Coqui TTS](https://github.com/coqui-ai/TTS)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| Install backend deps | `pip install -r backend/requirements.txt` |
| Install frontend deps | `npm install` (in frontend/) |
| Start backend | `uvicorn backend/main:app --reload` |
| Start frontend | `npm run dev` (in frontend/) |
| Build frontend | `npm run build` (in frontend/) |
| Run Ollama | `ollama serve` |
| Pull Ollama models | `ollama pull llama3 nomic-embed-text` |

---

**Maintained By**: TeacherClone Team  
**License**: MIT
