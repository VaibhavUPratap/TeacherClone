import React, { useState, useEffect, useRef } from "react";
import { apiRequest, streamRequest } from "../../api/api";
import { 
  Atom, 
  Binary, 
  Code, 
  Beaker, 
  Brain,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Zap,
  BookOpen,
  Play,
  FileText,
  FileQuestion,
  ClipboardList,
  Layers,
  GraduationCap,
  Volume2,
  VolumeX,
  Loader2,
  Maximize2,
  Lightbulb,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Mapping string icons to Lucide components
const IconMap = {
  'Atom': Atom,
  'Binary': Binary,
  'Code': Code,
  'Beaker': Beaker,
  'Brain': Brain
};

const SubjectCard = ({ subject, onClick }) => {
  const Icon = IconMap[subject.icon] || BookOpen;
  
  return (
    <motion.div 
      className="subject-card glass"
      whileHover={{ scale: 1.02, y: -5, borderColor: '#6366f1' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(subject)}
    >
      <div className="subject-icon-wrapper">
        <Icon size={32} />
      </div>
      <div className="subject-info">
        <h3>{subject.name}</h3>
        <p>{subject.description}</p>
        <div className="subject-meta">
          <span className="enrolled">{subject.enrolled_count} Students</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

const ResourceCard = ({ resource, onClick }) => {
  return (
    <motion.div 
      className="resource-card glass"
      whileHover={{ scale: 1.02, y: -5, borderColor: '#a855f7' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(resource)}
    >
      <div className="resource-type-badge">{resource.type}</div>
      <div className="resource-icon">
        <FileText size={40} className="text-purple-400" />
      </div>
      <div className="resource-content">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <button className="learn-now-btn">
          <Play size={14} fill="currentColor" />
          Explain with AI
        </button>
      </div>
    </motion.div>
  );
};

const TeacherSelectionCard = ({ teacher, onClick }) => {
  return (
    <motion.div 
      className="teacher-select-card glass"
      whileHover={{ scale: 1.05, borderColor: '#10b981' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(teacher)}
    >
      <img src={teacher.avatar_url} alt={teacher.name} />
      <div className="teacher-name-overlay">
        <span>{teacher.name}</span>
        <small>{teacher.teaching_style}</small>
      </div>
    </motion.div>
  );
};

export default function ResourceDashboard() {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState('subjects'); // 'subjects', 'resources', 'teacher-selection', 'explanation'
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Explanation state
  const [explanationText, setExplanationText] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await apiRequest("/dashboard/subjects");
      setSubjects(data);
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = async (subject) => {
    setLoading(true);
    setSelectedSubject(subject);
    try {
      const data = await apiRequest(`/dashboard/subjects/${subject.id}/resources`);
      setResources(data);
      setStep('resources');
    } catch (err) {
      console.error("Failed to fetch resources:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = async (resource) => {
    setSelectedResource(resource);
    setLoading(true);
    try {
      const data = await apiRequest(`/dashboard/teachers/${selectedSubject.id}`);
      setTeachers(data);
      setStep('teacher-selection');
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setStep('explanation');
    generateExplanation(teacher, "standard");
  };

  const generateExplanation = async (teacher, mode = "standard") => {
    setExplanationText("");
    setIsExplaining(true);
    
    let prompt = `Explain this resource: ${selectedResource.title}. Content summary: ${selectedResource.content}`;
    
    if (mode === "summary") prompt = `Give me a quick high-level summary of: ${selectedResource.title}`;
    if (mode === "revision") prompt = `Give me exam-focused revision notes for: ${selectedResource.title}`;
    if (mode === "steps") prompt = `Break down ${selectedResource.title} into simple step-by-step concepts.`;
    if (mode === "numerical") prompt = `Focus on the numerical aspects and formulas in: ${selectedResource.title}`;

    let fullText = "";
    try {
      await streamRequest(
        `/chat/stream?question=${encodeURIComponent(prompt)}&teacher_id=${teacher.id}`,
        (token) => {
          fullText += token;
          setExplanationText(fullText);
        },
        () => {
          setIsExplaining(false);
          if (autoSpeak) handleTTS(fullText, teacher.voice_id);
        }
      );
    } catch (err) {
      console.error("Explanation error:", err);
      setIsExplaining(false);
    }
  };

  const handleTTS = async (text, voiceId) => {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tts/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: text.substring(0, 1000), 
          voice_id: voiceId,
          language: "en" 
        }),
      });

      if (!response.ok) throw new Error("TTS failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      await audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsSpeaking(false);
    }
  };

  if (loading && step === 'subjects') return <div className="loading-state">Loading subject universe...</div>;

  return (
    <div className="resource-learning-page">
      <AnimatePresence mode="wait">
        {step === 'subjects' && (
          <motion.div key="subjects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="section-header">
              <h1>Subject-Wise <span>Resources</span></h1>
              <p>Select a subject to access your intelligent study material.</p>
            </div>
            <div className="subjects-grid">
              {subjects.map(s => <SubjectCard key={s.id} subject={s} onClick={handleSubjectClick} />)}
            </div>
          </motion.div>
        )}

        {step === 'resources' && (
          <motion.div key="resources" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
            <button className="back-link" onClick={() => setStep('subjects')}>
              <ArrowLeft size={18} /> Back to Subjects
            </button>
            <div className="section-header">
              <h1>{selectedSubject.name} <span>Library</span></h1>
              <p>Everything you need to master {selectedSubject.name}.</p>
            </div>
            <div className="resources-grid">
              {resources.map(r => <ResourceCard key={r.id} resource={r} onClick={handleResourceClick} />)}
            </div>
          </motion.div>
        )}

        {step === 'teacher-selection' && (
          <motion.div key="teachers" className="teacher-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="teacher-selection-box glass">
              <h2>Explain this using which <span>teacher?</span></h2>
              <p>Every resource can be taught in a style that suits you.</p>
              <div className="teachers-selection-grid">
                {teachers.map(t => <TeacherSelectionCard key={t.id} teacher={t} onClick={handleTeacherSelect} />)}
              </div>
              <button className="close-btn" onClick={() => setStep('resources')}>Cancel</button>
            </div>
          </motion.div>
        )}

        {step === 'explanation' && (
          <motion.div key="explanation" className="explanation-view" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="explanation-layout">
              <aside className="explanation-sidebar">
                <button className="back-link" onClick={() => setStep('resources')}>
                  <ArrowLeft size={18} /> Back to Resources
                </button>
                
                <div className="active-teacher-card glass">
                  <img src={selectedTeacher.avatar_url} alt="T" />
                  <div className="teacher-info">
                    <h4>{selectedTeacher.name}</h4>
                    <span>{selectedTeacher.teaching_style}</span>
                  </div>
                </div>

                <div className="smart-features">
                  <h5>Smart Learning Modes</h5>
                  <button onClick={() => generateExplanation(selectedTeacher, "summary")}>
                    <Zap size={16} /> Quick Summary
                  </button>
                  <button onClick={() => generateExplanation(selectedTeacher, "revision")}>
                    <GraduationCap size={16} /> Exam Revision
                  </button>
                  <button onClick={() => generateExplanation(selectedTeacher, "steps")}>
                    <Layers size={16} /> Step-by-Step
                  </button>
                  <button onClick={() => generateExplanation(selectedTeacher, "numerical")}>
                    <Target size={16} /> Numerical Focus
                  </button>
                </div>

                <div className="tts-control glass">
                  <button onClick={() => handleTTS(explanationText, selectedTeacher.voice_id)}>
                    {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    {isSpeaking ? "Stop Speaking" : "Listen to Explanation"}
                  </button>
                  <label className="auto-speak">
                    <input type="checkbox" checked={autoSpeak} onChange={e => setAutoSpeak(e.target.checked)} />
                    Auto-play voice
                  </label>
                </div>
              </aside>

              <main className="explanation-content glass">
                <div className="content-header">
                  <div className="resource-tag">{selectedResource.type}</div>
                  <h3>{selectedResource.title}</h3>
                </div>
                <div className="explanation-body">
                  {isExplaining && !explanationText && (
                    <div className="explaining-loader">
                      <Loader2 size={24} className="animate-spin" />
                      <span>{selectedTeacher.name} is reading the resource...</span>
                    </div>
                  )}
                  <div className="text-content">
                    {explanationText.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    {isExplaining && <span className="cursor-blink">|</span>}
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .resource-learning-page {
          padding: 40px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 48px;
        }

        .section-header h1 {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .section-header h1 span {
          background: linear-gradient(to right, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header p {
          color: #94a3b8;
          font-size: 1.2rem;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          margin-bottom: 24px;
          font-weight: 600;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: white;
        }

        .subjects-grid, .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .subject-card, .resource-card {
          padding: 24px;
          border-radius: 24px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s;
        }

        .subject-icon-wrapper {
          width: 64px; height: 64px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          color: #6366f1;
          margin-bottom: 20px;
        }

        .subject-info h3 { font-size: 1.4rem; margin-bottom: 8px; }
        .subject-info p { color: #64748b; font-size: 0.95rem; margin-bottom: 16px; }
        .subject-meta { display: flex; justify-content: space-between; color: #475569; font-size: 0.8rem; font-weight: 700; }

        .resource-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 48px;
        }

        .resource-type-badge {
          position: absolute; top: 16px; right: 16px;
          background: rgba(168, 85, 247, 0.1);
          color: #a855f7;
          padding: 4px 12px; border-radius: 12px;
          font-size: 0.7rem; font-weight: 800;
        }

        .resource-icon { margin-bottom: 20px; }
        .resource-content h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .resource-content p { color: #64748b; font-size: 0.85rem; margin-bottom: 20px; }

        .learn-now-btn {
          display: flex; align-items: center; gap: 8px;
          background: #a855f7; color: white;
          padding: 10px 20px; border-radius: 12px;
          font-weight: 700; font-size: 0.9rem;
          border: none; cursor: pointer;
          transition: all 0.2s;
        }

        .teacher-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }

        .teacher-selection-box {
          width: 90%; max-width: 700px;
          padding: 48px; border-radius: 32px;
          text-align: center;
        }

        .teacher-selection-box h2 span { color: #10b981; }

        .teachers-selection-grid {
          display: flex; justify-content: center; gap: 24px;
          margin: 40px 0;
        }

        .teacher-select-card {
          width: 140px; height: 140px;
          border-radius: 24px; overflow: hidden;
          position: relative; cursor: pointer;
        }

        .teacher-select-card img { width: 100%; height: 100%; object-fit: cover; }
        .teacher-name-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 12px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white; display: flex; flex-direction: column;
        }
        .teacher-name-overlay span { font-weight: 700; font-size: 0.9rem; }
        .teacher-name-overlay small { font-size: 0.6rem; color: #10b981; font-weight: 800; }

        .close-btn { background: none; border: none; color: #64748b; cursor: pointer; font-weight: 600; }

        .explanation-view { height: calc(100vh - 120px); }
        .explanation-layout { display: grid; grid-template-columns: 320px 1fr; gap: 32px; height: 100%; }

        .explanation-sidebar { display: flex; flex-direction: column; gap: 24px; }
        
        .active-teacher-card {
          padding: 20px; border-radius: 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .active-teacher-card img { width: 60px; height: 60px; border-radius: 14px; }
        .active-teacher-card h4 { margin: 0; font-size: 1.1rem; }
        .active-teacher-card span { font-size: 0.75rem; color: #10b981; font-weight: 700; }

        .smart-features {
          background: rgba(255,255,255,0.02);
          padding: 24px; border-radius: 24px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .smart-features h5 { margin-bottom: 8px; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
        .smart-features button {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.05); color: white;
          border: 1px solid rgba(255,255,255,0.05); cursor: pointer;
          font-weight: 600; transition: all 0.2s;
        }
        .smart-features button:hover { background: rgba(99, 102, 241, 0.1); border-color: #6366f1; }

        .tts-control { padding: 24px; border-radius: 24px; display: flex; flex-direction: column; gap: 16px; }
        .tts-control button {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px; border-radius: 14px; background: #10b981; color: white;
          border: none; font-weight: 700; cursor: pointer;
        }
        .auto-speak { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #94a3b8; }

        .explanation-content {
          padding: 48px; border-radius: 32px; overflow-y: auto;
          background: rgba(15, 15, 25, 0.4);
        }

        .content-header { margin-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 24px; }
        .resource-tag { color: #a855f7; font-size: 0.8rem; font-weight: 800; margin-bottom: 8px; }
        .content-header h3 { font-size: 2rem; margin: 0; }

        .explanation-body { line-height: 1.8; font-size: 1.1rem; color: rgba(255,255,255,0.9); }
        .explaining-loader { display: flex; align-items: center; gap: 16px; color: #10b981; font-weight: 700; }

        .cursor-blink { animation: blink 1s infinite; color: #6366f1; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .loading-state { height: 60vh; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #6366f1; font-weight: 700; }
      `}} />
    </div>
  );
}
