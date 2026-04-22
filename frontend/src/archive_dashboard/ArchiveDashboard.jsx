import React from "react";
import "./ArchiveDashboard.css";

// ─── ICONS ───────────────────────────────────────────────

const FolderIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
  </svg>
);

const SlidesIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-11-2l5-5-5-5v10z" />
  </svg>
);

const LineChartIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v18h18V21H3V3zM10 13.5l4-4 4 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArchiveBoxIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4M12 12v3m0 0l-2-2m2 2l2-2" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GearIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.22-.07.49.12.61l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39-.96c.22-.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2zm9-4v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.68C8.63 6.36 7 8.92 7 12v5l-2 2v1h14v-1l-2-2z" />
  </svg>
);

const SlideArrowUpIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM12 6l-4 4h3v4h2v-4h3l-4-4z" />
  </svg>
);

const MovieClapperIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
  </svg>
);

const ChartBarSquareIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z" />
  </svg>
);

const TipInfoIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

// ─── COMPONENT ───────────────────────────────────────────

export default function ArchiveDashboard() {
  return (
    <div className="ad-root">
      
      {/* ────────────────── TOP NAVBAR ────────────────── */}
      <header className="ad-topbar">
        <div className="ad-topbar-left">
          <h1 className="ad-topbar-logo">TeacherClone</h1>
        </div>
        
        <div className="ad-topbar-right">
          <nav className="ad-topbar-nav">
            <a href="#resources">Resources</a>
            <a href="#conversations">Conversations</a>
            <a href="#archive" className="active">Archive</a>
          </nav>
          
          <div className="ad-topbar-actions">
            <BellIcon />
            <GearIcon />
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=1e6091&color=fff&rounded=true&size=28" 
              alt="Profile" 
              className="ad-avatar" 
            />
          </div>
        </div>
      </header>

      <div className="ad-main-layout">
        
        {/* ────────────────── SIDEBAR ────────────────── */}
        <aside className="ad-sidebar">
          
          {/* Internal Sidebar Header */}
          <div className="ad-sidebar-header">
            <h2>TeacherClone</h2>
            <p>INTELLECTUAL WORKSPACE</p>
          </div>

          <nav className="ad-sidebar-nav">
            <a href="#resources" className="ad-nav-item"><FolderIcon /> Resources</a>
            <a href="#conversations" className="ad-nav-item"><ChatBubbleIcon /> Conversations</a>
            <a href="#lectures" className="ad-nav-item"><GraduationCapIcon /> Lectures</a>
            <a href="#slides" className="ad-nav-item"><SlideArrowUpIcon /> Slides</a>
            <a href="#data" className="ad-nav-item"><LineChartIcon /> Classroom Data</a>
            <a href="#archive" className="ad-nav-item active"><ArchiveBoxIcon /> Archive</a>
          </nav>

          <div className="ad-sidebar-bottom">
            <a href="#help" className="ad-nav-item"><HelpIcon /> Help</a>
            <a href="#settings" className="ad-nav-item"><GearIcon /> Settings</a>
          </div>
          
        </aside>

        {/* ────────────────── CONTENT AREA ────────────────── */}
        <main className="ad-content-wrapper">
          <div className="ad-content">
            
            {/* Header block */}
            <div className="ad-content-header">
              <div className="ad-ch-left">
                <h2>Archive</h2>
                <p>Previously used lectures and materials</p>
              </div>
              <div className="ad-ch-actions">
                <button className="ad-btn-outline">Restore Selected</button>
                <button className="ad-btn-outline ad-color-alert">Delete Permanently</button>
              </div>
            </div>

            {/* List */}
            <div className="ad-archive-list">
              
              <div className="ad-list-card">
                <div className="ad-lc-icon blue"><GraduationCapIcon /></div>
                <div className="ad-lc-details">
                  <h3>Quantum Physics: Introduction &amp; Principles</h3>
                  <p>Lecture • Archived Oct 12, 2023 • 1.4 GB</p>
                </div>
              </div>

              <div className="ad-list-card">
                <div className="ad-lc-icon purple"><SlideArrowUpIcon /></div>
                <div className="ad-lc-details">
                  <h3>Thermodynamics Master Slides - Fall 2022</h3>
                  <p>Slides • Archived Sep 28, 2023 • 42 MB</p>
                </div>
              </div>

              <div className="ad-list-card">
                <div className="ad-lc-icon pink"><MovieClapperIcon /></div>
                <div className="ad-lc-details">
                  <h3>Lab Session: Fluid Dynamics Experiment</h3>
                  <p>Video • Archived Aug 15, 2023 • 2.8 GB</p>
                </div>
              </div>

              <div className="ad-list-card">
                <div className="ad-lc-icon grey"><ChartBarSquareIcon /></div>
                <div className="ad-lc-details">
                  <h3>Midterm Performance Data - Physics 101</h3>
                  <p>Data • Archived Jul 04, 2023 • 12 MB</p>
                </div>
              </div>

              <div className="ad-list-card">
                <div className="ad-lc-icon blue"><GraduationCapIcon /></div>
                <div className="ad-lc-details">
                  <h3>Astrophysics: Galactic Evolution Lecture 5</h3>
                  <p>Lecture • Archived Jun 21, 2023 • 1.1 GB</p>
                </div>
              </div>

            </div>

            <div className="ad-load-more">
              <span>Load more archived materials</span>
            </div>

          </div>
        </main>

        {/* ────────────────── RIGHT RAIL ────────────────── */}
        <aside className="ad-right-rail">
          
          <h4 className="ad-rr-title">STATS OVERVIEW</h4>
          
          <div className="ad-stat-card">
            <p className="ad-sc-label">Total archived items</p>
            <h2 className="ad-sc-value purple">12</h2>
          </div>

          <div className="ad-stat-card">
            <p className="ad-sc-label">Last archived</p>
            <h2 className="ad-sc-value white">Lecture 5</h2>
          </div>

          <div className="ad-stat-card">
            <p className="ad-sc-label">Storage Reclaimed</p>
            <h2 className="ad-sc-value grey">5.8 GB</h2>
          </div>

          <h4 className="ad-rr-title mt-40">ARCHIVAL POLICY</h4>
          <p className="ad-rr-desc">
            Items are kept for 365 days before being automatically moved to deep storage. Permanent deletion cannot be undone.
          </p>

          <div className="ad-tip-card">
            <div className="ad-tip-header">
              <TipInfoIcon />
              <h4>Workspace Tip</h4>
            </div>
            <p>Archive older lectures to keep your active workspace clutter-free for current students.</p>
          </div>

        </aside>

      </div>
    </div>
  );
}
