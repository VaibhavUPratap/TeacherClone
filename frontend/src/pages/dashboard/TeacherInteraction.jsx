import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  BookOpen, 
  Brain, 
  MessageCircle, 
  Zap, 
  TrendingUp, 
  ChevronRight,
  Info,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentChat from "../../components/chat/StudentChat";

export default function TeacherInteraction() {
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [activeSubject, setActiveSubject] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    const teacherData = localStorage.getItem('activeTeacher');
    if (teacherData) {
      const teacher = JSON.parse(teacherData);
      setActiveTeacher(teacher);
      setActiveSubject(teacher.subject_id.charAt(0).toUpperCase() + teacher.subject_id.slice(1));
    }
  }, []);

  const handleQuickAction = (actionId) => {
    if (!chatRef.current) return;
    
    let prompt = "";
    switch(actionId) {
      case 'doubts': prompt = "Sir, I have a doubt regarding the latest topic. Can you help?"; break;
      case 'explain': prompt = `Can you explain the core concepts of ${activeSubject} that we covered yesterday?`; break;
      case 'numerical': prompt = "Could you help me solve a numerical problem related to this topic?"; break;
      case 'revise': prompt = "Can we do a quick 5-minute revision of what we've learned so far?"; break;
      default: prompt = "Hello Sir!";
    }
    
    chatRef.current.sendMessage(prompt);
  };

  const quickActions = [
    { id: 'doubts', label: 'Ask a Doubt', icon: MessageCircle, color: '#6366f1' },
    { id: 'explain', label: 'Explain Concept', icon: Brain, color: '#8b5cf6' },
    { id: 'numerical', label: 'Solve Numerical', icon: Zap, color: '#f59e0b' },
    { id: 'revise', label: 'Quick Revision', icon: BookOpen, color: '#10b981' },
  ];

  return (
    <div className="interaction-page fade-in">
      <div className="interaction-layout">
        {/* Left Column: Stats & Context */}
        <aside className="interaction-left">
          <motion.div 
            className="teacher-info-card glass-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="teacher-header">
              <div className="avatar-glow-wrapper">
                <div className="avatar-glow" />
                <img src={activeTeacher?.avatar_url} alt={activeTeacher?.name} />
              </div>
              <div className="name-meta">
                <h2>{activeTeacher?.name}</h2>
                <span className="subject-badge">{activeSubject} Expert</span>
              </div>
            </div>
            <p className="teacher-bio">{activeTeacher?.description}</p>
            <div className="style-pills">
              <span className="pill">{activeTeacher?.teaching_style}</span>
              <span className="pill online">Active Now</span>
            </div>
          </motion.div>

          <motion.div 
            className="learning-metrics glass-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="metrics-header">
              <TrendingUp size={18} className="text-accent" />
              <h3>Progress Insights</h3>
            </div>
            <div className="metrics-list">
              <div className="metric-item">
                <span className="label">Topic Mastery</span>
                <div className="progress-bar">
                  <motion.div className="fill" initial={{ width: 0 }} animate={{ width: '72%' }} />
                </div>
                <span className="value">72%</span>
              </div>
              <div className="metric-item">
                <span className="label">Doubts Resolved</span>
                <span className="value badge">12</span>
              </div>
            </div>
          </motion.div>

          <div className="quick-actions-container">
            <h4 className="section-label">Common Requests</h4>
            <div className="quick-actions-grid">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  className="action-btn glass"
                  whileHover={{ y: -2, background: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.id)}
                >
                  <action.icon size={18} style={{ color: action.color }} />
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </aside>

        {/* Middle Column: The Chat Agent */}
        <main className="interaction-main">
          <StudentChat ref={chatRef} />
        </main>

        {/* Right Column: Knowledge & History */}
        <aside className="interaction-right">
          <motion.div 
            className="context-knowledge glass-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="context-header">
              <BookOpen size={18} />
              <h3>Lecture Context</h3>
            </div>
            <div className="knowledge-sources">
              <div className="source-item active">
                <div className="source-icon"><FileText size={14} /></div>
                <div className="source-details">
                  <p className="source-name">Yesterday's Lecture.pdf</p>
                  <p className="source-meta">Currently in context</p>
                </div>
              </div>
              <div className="source-item">
                <div className="source-icon"><FileText size={14} /></div>
                <div className="source-details">
                  <p className="source-name">Physics Basics.pdf</p>
                  <p className="source-meta">Available</p>
                </div>
              </div>
            </div>
            <button className="view-all-link">
              View all resources <ChevronRight size={14} />
            </button>
          </motion.div>

          <motion.div 
            className="session-tip glass-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="tip-header">
              <Sparkles size={18} className="text-yellow" />
              <h3>AI Teacher Tip</h3>
            </div>
            <p className="tip-text">
              Try asking <strong>"{activeTeacher?.name}, explain Question 3 from yesterday's assignment"</strong> to see how I use class context.
            </p>
          </motion.div>

          <div className="restricted-notice glass">
            <Info size={14} />
            <span>Educational discussion mode only</span>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .interaction-page {
          height: calc(100vh - 140px);
          overflow: hidden;
        }

        .interaction-layout {
          display: grid;
          grid-template-columns: 300px 1fr 300px;
          gap: 24px;
          height: 100%;
        }

        .interaction-left, .interaction-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
          padding-bottom: 20px;
        }

        .interaction-left::-webkit-scrollbar, 
        .interaction-right::-webkit-scrollbar {
          display: none;
        }

        .glass-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        /* Teacher Info Card */
        .teacher-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .avatar-glow-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
        }

        .avatar-glow {
          position: absolute;
          inset: 0;
          background: var(--accent-primary);
          filter: blur(20px);
          opacity: 0.3;
          border-radius: 50%;
        }

        .avatar-glow-wrapper img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #1a1a24;
        }

        .name-meta h2 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .subject-badge {
          font-size: 0.7rem;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .teacher-bio {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .style-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pill {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pill.online {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        /* Metrics Card */
        .metrics-header, .context-header, .tip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .metrics-header h3, .context-header h3, .tip-header h3 {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
        }

        .metric-item {
          margin-bottom: 16px;
        }

        .metric-item .label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin-bottom: 4px;
          overflow: hidden;
        }

        .progress-bar .fill {
          height: 100%;
          background: linear-gradient(to right, #6366f1, #a855f7);
          border-radius: 3px;
        }

        .metric-item .value {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .value.badge {
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 8px;
        }

        /* Quick Actions */
        .section-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: left;
        }

        /* Context Card */
        .knowledge-sources {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .source-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
        }

        .source-item.active {
          border: 1px solid rgba(99, 102, 241, 0.2);
          background: rgba(99, 102, 241, 0.05);
        }

        .source-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
        }

        .source-item.active .source-icon {
          color: #6366f1;
        }

        .source-name {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .source-meta {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .view-all-link {
          font-size: 0.75rem;
          color: #6366f1;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Tip Card */
        .tip-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .tip-text strong {
          color: white;
        }

        /* Notice */
        .restricted-notice {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.7rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .interaction-main {
          height: 100%;
        }

        .text-accent { color: #6366f1; }
        .text-yellow { color: #f59e0b; }

        @media (max-width: 1200px) {
          .interaction-layout {
            grid-template-columns: 260px 1fr;
          }
          .interaction-right {
            display: none;
          }
        }
      `}} />
    </div>
  );
}
