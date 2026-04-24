import React from 'react';
import { Video, Play, Clock, Calendar, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Lectures() {
  const lectures = [
    { title: "Advanced Calculus - Week 3", duration: "1h 45m", date: "Oct 12, 2024", status: "Ready" },
    { title: "Linear Algebra Fundamentals", duration: "55m", date: "Oct 10, 2024", status: "Processing" },
  ];

  return (
    <div className="lectures-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Lecture Videos</h2>
          <p>Recorded sessions and virtual classroom content</p>
        </div>
        <button className="btn-primary">
          <Video size={18} />
          Record New
        </button>
      </header>

      <div className="lectures-grid">
        {lectures.map((lecture, i) => (
          <motion.div 
            key={i} 
            className="glass-card lecture-card"
            whileHover={{ y: -5 }}
          >
            <div className="video-thumbnail glass">
              <Play size={32} />
              <span className="duration">{lecture.duration}</span>
            </div>
            <div className="lecture-info">
              <div className="title-row">
                <h3>{lecture.title}</h3>
                <button className="more-btn"><MoreHorizontal size={18} /></button>
              </div>
              <div className="meta-row">
                <span><Calendar size={14} /> {lecture.date}</span>
                <span className={`status-badge ${lecture.status.toLowerCase()}`}>{lecture.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .lectures-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-text h2 { font-size: 2rem; margin-bottom: 4px; }
        .header-text p { color: var(--text-secondary); }
        .btn-primary { 
          display: flex; align-items: center; gap: 8px; padding: 10px 20px; 
          background: var(--accent-primary); color: white; border-radius: 12px; font-weight: 600;
        }
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
        .title-row h3 { font-size: 1rem; }
        .meta-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; color: var(--text-tertiary); }
        .status-badge { padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 0.7rem; }
        .status-badge.ready { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-badge.processing { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
      `}} />
    </div>
  );
}
