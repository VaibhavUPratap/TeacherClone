import React from 'react';
import { Archive as ArchiveIcon, Search, Filter, MoreHorizontal, File } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Archive() {
  const archives = [
    { name: "Fall 2023 - Physics 101", items: 45, date: "Dec 2023" },
    { name: "Spring 2023 - Math Foundations", items: 32, date: "May 2023" },
  ];

  return (
    <div className="archive-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Archive</h2>
          <p>Past semesters and historical course data</p>
        </div>
      </header>

      <div className="archive-controls glass-card">
        <div className="search-box glass">
          <Search size={18} />
          <input type="text" placeholder="Search archives..." />
        </div>
        <button className="filter-btn glass"><Filter size={18} /> Filter</button>
      </div>

      <div className="archive-grid">
        {archives.map((folder, i) => (
          <motion.div 
            key={i} 
            className="glass-card archive-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-top">
              <div className="folder-icon purple">
                <ArchiveIcon size={24} />
              </div>
              <button className="more-btn"><MoreHorizontal size={18} /></button>
            </div>
            <div className="card-info">
              <h3>{folder.name}</h3>
              <p>{folder.items} items • Archived {folder.date}</p>
            </div>
            <div className="card-footer">
              <button className="btn-text">Open Archive</button>
            </div>
          </motion.div>
        ))}
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
        .archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .archive-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; }
        .folder-icon { 
          width: 48px; height: 48px; border-radius: 14px; display: flex; 
          align-items: center; justify-content: center;
        }
        .folder-icon.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .card-info h3 { font-size: 1.125rem; margin-bottom: 4px; }
        .card-info p { font-size: 0.8125rem; color: var(--text-tertiary); }
        .card-footer { border-top: 1px solid var(--border-color); pt: 16px; margin-top: 10px; }
        .btn-text { color: var(--accent-primary); font-weight: 600; font-size: 0.875rem; padding-top: 16px; }
      `}} />
    </div>
  );
}
