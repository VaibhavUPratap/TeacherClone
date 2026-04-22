import React from "react";
import "./ClassdataDashboard.css";

// ─── ICONS ───────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

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

const PlayOutlineIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FileUpIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const LineChartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 6-6" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const GearIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.22-.07.49.12.61l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39-.96c.22-.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const SupportIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20a10 10 0 100-20 10 10 0 000 20zM21 21l-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2zm9-4v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.68C8.63 6.36 7 8.92 7 12v5l-2 2v1h14v-1l-2-2z" />
  </svg>
);

const AtSymbolIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
  </svg>
);

const DotIcon = () => (
  <svg width="8" height="8" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FloatingChatIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.61 1.67 4.93 4.19 6.27l-1.46 3.91c-.18.49.23.95.73.81L10.3 19.6c.55.13 1.12.21 1.7.21 5.52 0 10-3.58 10-8s-4.48-8-10-8zm-2 9H8V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
  </svg>
);


// ─── COMPONENT ───────────────────────────────────────────

export default function ClassdataDashboard() {
  return (
    <div className="cd-root">
      
      {/* ────────────────── SIDEBAR ────────────────── */}
      <aside className="cd-sidebar">
        <div className="cd-brand">
          <h1>TEACHERCLONE</h1>
          <p>Academic Engine</p>
        </div>

        <button className="cd-btn-new">
          <PlusIcon /> New Session
        </button>

        <nav className="cd-nav">
          <a href="#resources" className="cd-nav-item"><FolderIcon /> Resources</a>
          <a href="#conversations" className="cd-nav-item"><ChatBubbleIcon /> Conversations</a>
          <a href="#lectures" className="cd-nav-item"><PlayOutlineIcon /> Lectures</a>
          <a href="#slides" className="cd-nav-item"><FileUpIcon /> Slides</a>
          <a href="#data" className="cd-nav-item active"><LineChartIcon /> Classroom Data</a>
          <a href="#archive" className="cd-nav-item"><ArchiveIcon /> Archive</a>
        </nav>

        <div className="cd-nav-bottom">
          <a href="#support" className="cd-nav-item"><SupportIcon /> Support</a>
          <a href="#docs" className="cd-nav-item"><BookIcon /> Documentation</a>
        </div>
      </aside>

      {/* ────────────────── MAIN CONTENT ────────────────── */}
      <main className="cd-main">
        
        {/* Top Navbar */}
        <header className="cd-topbar">
          <div className="cd-tabs">
            <span className="cd-tab active">Analytics View</span>
            <span className="cd-tab">History</span>
          </div>

          <div className="cd-topbar-right">
            <div className="cd-search-container">
              <SearchIcon />
              <input type="text" placeholder="Search interactions..." className="cd-search-input" />
            </div>
            <BellIcon className="cd-tb-icon" />
            <GearIcon className="cd-tb-icon" />
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=1e6091&color=fff&rounded=true&size=28" 
              alt="Profile" 
              className="cd-avatar" 
            />
          </div>
        </header>

        <div className="cd-main-flex">
          
          {/* Left / Center Area */}
          <div className="cd-content-area">
            
            <div className="cd-header-row">
              <div>
                <h2 className="cd-page-title">Classroom Data</h2>
                <p className="cd-page-subtitle">Teaching interactions and communication history</p>
              </div>
              <div className="cd-header-actions">
                <button className="cd-btn-secondary">Upload Notes</button>
                <button className="cd-btn-primary">Import Emails</button>
              </div>
            </div>

            <div className="cd-interactions-list">
              
              {/* Item 1 */}
              <div className="cd-list-item item-blue">
                <div className="cd-item-icon blue">
                  <AtSymbolIcon />
                </div>
                <div className="cd-item-content">
                  <h3>Email excerpt: Project Deadline Extension</h3>
                  <p>Hi Professor, I was looking at the syllabus and noticed the deadlock project is due during the career fair. Would it be possible to get a 2-day grace...</p>
                  <div className="cd-item-meta">
                    <span className="cd-badge badge-blue">EXPLANATION</span>
                    <span className="cd-time"><ClockIcon /> 2 hours ago</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="cd-list-item item-grey">
                <div className="cd-item-icon pinkish">
                  <QuestionIcon />
                </div>
                <div className="cd-item-content">
                  <h3>Student question: Mutual Exclusion</h3>
                  <p>Can you clarify how the Peterson's algorithm ensures mutual exclusion if both processes try to enter the critical section simultaneously with the sam...</p>
                  <div className="cd-item-meta">
                    <span className="cd-badge badge-grey">DOUBT</span>
                    <span className="cd-time"><ClockIcon /> 5 hours ago</span>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="cd-list-item item-purple">
                <div className="cd-item-icon purple">
                  <ChatBubbleIcon />
                </div>
                <div className="cd-item-content">
                  <h3>Discussion snippet: Seminar Recap</h3>
                  <p>We discussed the performance trade-offs of spinlocks vs semaphores in low-latency systems. Students were particularly interested in the context...</p>
                  <div className="cd-item-meta">
                    <span className="cd-badge badge-purple">DISCUSSION</span>
                    <span className="cd-time"><ClockIcon /> Yesterday</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ────────────────── RIGHT RAIL ────────────────── */}
          <aside className="cd-right-rail">
            
            {/* System Health Card */}
            <div className="cd-rr-card sys-health">
              <div className="cd-rr-header-split">
                <h4 className="cd-rr-title-sm">SYSTEM HEALTH</h4>
                <span className="cd-connected-status"><DotIcon /> Connected</span>
              </div>
              
              <div className="cd-sh-row">
                <span>Last synced</span>
                <span className="cd-sh-val">1 hour ago</span>
              </div>
              <div className="cd-sh-row">
                <span>Total entries</span>
                <span className="cd-sh-val">1,402</span>
              </div>

              <div className="cd-rr-footer-action">
                <button className="cd-btn-text">REFRESH DATABASE</button>
              </div>
            </div>

            {/* Weekly Insights */}
            <h4 className="cd-rr-section-title">WEEKLY INSIGHTS</h4>
            
            <div className="cd-rr-card primary-focus">
              <p className="cd-pf-label">PRIMARY FOCUS</p>
              <div className="cd-pf-main">
                <h2>Deadlocks</h2>
                <div className="cd-pf-sparkle"><SparkleIcon /></div>
              </div>
              <p className="cd-pf-desc">Most discussed topic this week</p>
            </div>

            <div className="cd-rr-card frequent-qs">
              <h2 className="cd-fq-number">12</h2>
              <p className="cd-fq-label">Frequent questions this week</p>
              
              <div className="cd-progress-track">
                <div className="cd-progress-fill w-30"></div>
              </div>
              <p className="cd-fq-increase">15% increase from last period</p>
            </div>

            {/* Archive Preview */}
            <h4 className="cd-rr-section-title">ARCHIVE PREVIEW</h4>
            <div className="cd-archive-grid">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="cd-archive-cell"></div>
              ))}
            </div>

          </aside>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="cd-fab">
        <FloatingChatIcon />
      </div>

    </div>
  );
}
