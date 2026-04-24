import React from 'react';
import { FileText, Download, Share2, Eye, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Slides() {
  const slides = [
    { title: "Introduction to Thermodynamics", pages: 24, size: "4.2 MB", date: "Oct 15, 2024" },
    { title: "Organic Chemistry Basics", pages: 18, size: "3.1 MB", date: "Oct 14, 2024" },
    { title: "Fluid Dynamics - Part 1", pages: 32, size: "5.5 MB", date: "Oct 12, 2024" },
  ];

  return (
    <div className="slides-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Teaching Slides</h2>
          <p>Manage and present your lecture presentations</p>
        </div>
        <button className="btn-primary">
          <FileText size={18} />
          Upload New
        </button>
      </header>

      <div className="slides-list">
        {slides.map((slide, i) => (
          <motion.div 
            key={i} 
            className="glass-card slide-row"
            whileHover={{ x: 5 }}
          >
            <div className="slide-icon glass">
              <FileText size={24} />
            </div>
            <div className="slide-details">
              <h3>{slide.title}</h3>
              <p>{slide.pages} Pages • {slide.size} • Uploaded {slide.date}</p>
            </div>
            <div className="slide-actions">
              <button className="icon-btn glass"><Eye size={18} /></button>
              <button className="icon-btn glass"><Download size={18} /></button>
              <button className="icon-btn glass"><Share2 size={18} /></button>
              <button className="icon-btn"><MoreVertical size={18} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .slides-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-text h2 { font-size: 2rem; margin-bottom: 4px; }
        .header-text p { color: var(--text-secondary); }
        .btn-primary { 
          display: flex; align-items: center; gap: 8px; padding: 10px 20px; 
          background: var(--accent-primary); color: white; border-radius: 12px; font-weight: 600;
        }
        .slides-list { display: flex; flex-direction: column; gap: 16px; }
        .slide-row { display: flex; align-items: center; padding: 20px; gap: 20px; }
        .slide-icon { 
          width: 50px; height: 50px; border-radius: 12px; display: flex; 
          align-items: center; justify-content: center; color: var(--accent-primary);
        }
        .slide-details { flex: 1; }
        .slide-details h3 { font-size: 1rem; margin-bottom: 4px; }
        .slide-details p { font-size: 0.8125rem; color: var(--text-tertiary); }
        .slide-actions { display: flex; gap: 8px; }
        .icon-btn { 
          width: 36px; height: 36px; border-radius: 10px; display: flex; 
          align-items: center; justify-content: center; color: var(--text-secondary);
        }
        .icon-btn:hover { color: var(--text-primary); }
      `}} />
    </div>
  );
}
