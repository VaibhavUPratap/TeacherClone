# TeacherClone 🍎
**Your AI-Powered Educational Companion**

TeacherClone is an intelligent tutoring assistant designed to help students master their subjects through interactive AI conversations. It leverages Retrieval-Augmented Generation (RAG) to provide context-aware answers based on uploaded study materials, ensuring high accuracy and preventing hallucinations.

---

## 🚀 Key Features

- **📚 Intelligent RAG System**: Upload PDFs or textbooks and get answers strictly based on the provided context using ChromaDB and Ollama.
- **🛡️ Topic Guard**: Built-in validation system that keeps the assistant focused on educational content, politely redirecting off-topic queries.
- **🎙️ Local Text-to-Speech (TTS)**: Realistic audio responses generated locally using Coqui XTTS-v2, allowing students to listen to explanations.
- **📊 Analytics Dashboard**: Track learning progress, identify weak areas, and view recent activity with a sleek management interface.
- **🔐 Secure Authentication**: Integrated with Firebase Authentication for a safe and personalized user experience.
- **⚡ Real-time Streaming**: Token-by-token response streaming for a natural, low-latency conversation feel.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Vector Database**: [ChromaDB](https://www.trychroma.com/) (Local RAG)
- **Database**: [MongoDB](https://www.mongodb.com/) (Historical Data)
- **AI Models**: 
  - [Ollama](https://ollama.com/) (llama3 & nomic-embed-text)
  - [OpenAI](https://openai.com/) (GPT-4o fallback)
- **TTS**: [Coqui XTTS-v2](https://github.com/coqui-ai/TTS)
- **Auth**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

### Frontend
- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: React Hooks
- **Styling**: CSS (Modern aesthetic with glassmorphism)

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- [Ollama](https://ollama.com/) installed and running
- MongoDB instance (local or Atlas)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Ollama Configuration
Ensure you have the required models pulled:
```bash
ollama pull llama3
ollama pull nomic-embed-text
```

### 4. Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```env
OPENAI_API_KEY=your_key
FIREBASE_CREDENTIALS_PATH=backend/firebase_admin.json
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🏃 Running the Application

### Start Backend
```bash
cd backend
uvicorn main:app --reload
```

### Start Frontend
```bash
cd frontend
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.