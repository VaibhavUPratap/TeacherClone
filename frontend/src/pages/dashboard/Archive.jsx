import React, { useState, useEffect } from 'react';
import { Archive as ArchiveIcon, Search, Filter, MoreHorizontal, File, MessageSquare, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiRequest } from '../../api/api';

export default function Archive() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await apiRequest("/chat/history?limit=100");
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state glass-card"><Loader2 className="animate-spin" /> Loading Archive...</div>;

  return (
    <div className="archive-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Learning Archive</h2>
          <p>Historical chat interactions and doubt resolutions</p>
        </div>
      </header>

      <div className="archive-controls glass-card">
        <div className="search-box glass">
          <Search size={18} />
          <input type="text" placeholder="Search your past questions..." />
        </div>
        <button className="filter-btn glass"><Filter size={18} /> Filter</button>
      </div>

      <div className="archive-grid">
        {history.length > 0 ? (
          history.map((chat, i) => (
            <motion.div 
              key={i} 
              className="glass-card archive-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-top">
                <div className="folder-icon purple">
                  <MessageSquare size={24} />
                </div>
                <div className="category-tag">{chat.category}</div>
              </div>
              <div className="card-info">
                <h3>{chat.question}</h3>
                <div className="meta">
                  <span className="time"><Clock size={14} /> {chat.time}</span>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-text">View Session</button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-history">
            <p>No chat history found. Start a conversation with a teacher!</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .archive-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-text h2 { font-size: 2rem; margin-bottom: 4px; }
        .header-text p { color: var(--text-secondary); }
        .archive-controls { padding: 16px; display: flex; gap: 16px; }
        .search-box { 
          flex: 1; display: flex; align-items: center; gap: 12px; padding: 0 16px; 
          border-radius: 12px; color: var(--text-tertiary);
        }
        .search-box input { 
          flex: 1; background: transparent; border: none; outline: none; 
          color: white; height: 44px; font-size: 0.9375rem;
        }
        .filter-btn { 
          display: flex; align-items: center; gap: 8px; padding: 0 20px; 
          border-radius: 12px; color: var(--text-secondary); font-weight: 600;
        }
        .archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .archive-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; }
        .folder-icon { 
          width: 48px; height: 48px; border-radius: 14px; display: flex; 
          align-items: center; justify-content: center;
        }
        .folder-icon.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        
        .category-tag {
          font-size: 0.7rem; font-weight: 800; background: rgba(99, 102, 241, 0.1);
          color: #6366f1; padding: 4px 10px; border-radius: 6px;
          text-transform: capitalize;
        }

        .card-info h3 { 
          font-size: 1.125rem; margin-bottom: 12px; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-info .meta { display: flex; align-items: center; gap: 12px; color: var(--text-tertiary); font-size: 0.8125rem; }
        .meta .time { display: flex; align-items: center; gap: 4px; }

        .card-footer { border-top: 1px solid var(--border-color); pt: 16px; margin-top: 10px; }
        .btn-text { color: var(--accent-primary); font-weight: 600; font-size: 0.875rem; padding-top: 16px; cursor: pointer; background: none; border: none; }
        
        .no-history { grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--text-tertiary); }
        .loading-state { height: 400px; display: flex; align-items: center; justify-content: center; gap: 16px; color: var(--accent-primary); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
