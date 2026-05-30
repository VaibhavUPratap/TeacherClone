import React, { useRef, useState, useEffect } from "react";
import { 
  History, 
  BookOpen,
  Sparkles,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentChat from "../../components/chat/StudentChat";
import { apiRequest } from "../../api/api";

export default function Conversations() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await apiRequest("/chat/history?limit=10");
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="conversations-page fade-in">
      <div className="chat-layout">
        {/* Left Column: History */}
        <aside className="chat-sidebar glass-card">
          <div className="sidebar-header">
            <History size={18} />
            <h3>Recent Chats</h3>
          </div>
          <div className="history-list">
            {loading ? (
              <div className="loading-small"><Loader2 className="animate-spin" size={16} /></div>
            ) : history.length > 0 ? (
              history.map((chat, i) => (
                <div key={chat.id} className={`history-item ${i === 0 ? 'active' : ''}`}>
                  <p className="item-title">{chat.question.substring(0, 25)}...</p>
                  <p className="item-date">{new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))
            ) : (
              <p className="no-history">No recent chats</p>
            )}
          </div>
        </aside>

        {/* Middle Column: Chat Area */}
        <main className="chat-main">
          <StudentChat onNewMessage={fetchHistory} />
        </main>

        {/* Right Column: Context/Sources */}
        <aside className="chat-context glass-card">
          <div className="sidebar-header">
            <BookOpen size={18} />
            <h3>Context</h3>
          </div>
          <div className="sources-content">
            <div className="source-card glass">
              <div className="source-badge">LIVE AI AGENT</div>
              <h4>Current Session</h4>
              <p>Your AI teacher is drawing knowledge from processed course materials and real-time context.</p>
            </div>
            <div className="source-card glass">
              <div className="source-badge">KNOWLEDGE BASE</div>
              <h4>References</h4>
              <p>Sources used in this conversation will appear here during long-form answers.</p>
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .conversations-page { height: 100%; display: flex; flex-direction: column; }
        .chat-layout { display: grid; grid-template-columns: 240px 1fr 280px; gap: 24px; height: calc(100vh - 160px); }
        .chat-sidebar, .chat-context { display: flex; flex-direction: column; padding: 20px; overflow-y: auto; }
        .sidebar-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; color: var(--text-primary); }
        .sidebar-header h3 { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 1px; }
        .history-list { display: flex; flex-direction: column; gap: 8px; }
        .history-item { padding: 12px; border-radius: 12px; cursor: pointer; transition: var(--transition-fast); border: 1px solid transparent; }
        .history-item:hover { background: rgba(255, 255, 255, 0.03); }
        .history-item.active { background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); }
        .item-title { font-size: 0.875rem; font-weight: 500; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .item-date { font-size: 0.75rem; color: var(--text-tertiary); }
        .chat-main { display: flex; flex-direction: column; overflow: hidden; }
        .sources-content { display: flex; flex-direction: column; gap: 16px; }
        .source-card { padding: 16px; border-radius: 16px; }
        .source-badge { display: inline-block; font-size: 0.625rem; font-weight: 800; padding: 2px 6px; background: rgba(99, 102, 241, 0.1); color: var(--accent-primary); border-radius: 4px; margin-bottom: 12px; }
        .source-card h4 { font-size: 0.875rem; margin-bottom: 8px; }
        .source-card p { font-size: 0.8125rem; color: var(--text-tertiary); line-height: 1.4; }
        .no-history { font-size: 0.8125rem; color: var(--text-tertiary); text-align: center; padding: 20px; }
        .loading-small { display: flex; justify-content: center; padding: 20px; color: var(--accent-primary); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
