import React, { useState, useEffect } from 'react';
import { Video, Play, Clock, Calendar, MoreHorizontal, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiRequest } from '../../api/api';

export default function Lectures() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await apiRequest("/ingest");
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state glass-card"><Loader2 className="animate-spin" /> Loading Class Materials...</div>;

  return (
    <div className="lectures-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Learning Materials</h2>
          <p>Processed PDFs and study notes for your AI teachers</p>
        </div>
      </header>

      <div className="lectures-grid">
        {documents.length > 0 ? (
          documents.map((doc, i) => (
            <motion.div 
              key={i} 
              className="glass-card lecture-card"
              whileHover={{ y: -5 }}
            >
              <div className="video-thumbnail glass">
                <Play size={32} />
                <span className="duration">{doc.chunk_count} Chunks</span>
              </div>
              <div className="lecture-info">
                <div className="title-row">
                  <h3>{doc.filename}</h3>
                  <button className="more-btn"><MoreHorizontal size={18} /></button>
                </div>
                <div className="meta-row">
                  <span><Calendar size={14} /> {new Date(doc.timestamp).toLocaleDateString()}</span>
                  <span className={`status-badge ready`}>Ready</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-data-msg">
            <p>No processed materials found. Upload a PDF in the Resources tab!</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .lectures-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-text h2 { font-size: 2rem; margin-bottom: 4px; }
        .header-text p { color: var(--text-secondary); }
        .lectures-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .lecture-card { overflow: hidden; }
        .video-thumbnail { 
          height: 180px; display: flex; align-items: center; justify-content: center; 
          background: rgba(255, 255, 255, 0.02); position: relative; color: var(--accent-primary);
        }
        .duration { 
          position: absolute; bottom: 12px; right: 12px; padding: 4px 8px; 
          background: rgba(0,0,0,0.6); color: white; border-radius: 6px; font-size: 0.75rem;
        }
        .lecture-info { padding: 20px; }
        .title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .title-row h3 { font-size: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .meta-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; color: var(--text-tertiary); }
        .status-badge { padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 0.7rem; }
        .status-badge.ready { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        
        .no-data-msg { grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-tertiary); }
        .loading-state { height: 400px; display: flex; align-items: center; justify-content: center; gap: 16px; color: var(--accent-primary); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
