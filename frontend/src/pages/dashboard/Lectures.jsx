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

  if (loading) return <div className="loading-state"><Loader2 className="animate-spin" /> Loading Class Materials...</div>;

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
              className="lecture-card"
              whileHover={{ y: -5 }}
            >
              <div className="video-thumbnail">
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
                  <span className="status-badge ready">Ready</span>
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
    </div>
  );
}
