import React from "react";
import "./ConversationDashboard.css";

// --- Icons ---
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

const BarChartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
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

const BellIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2zm9-4v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.68C8.63 6.36 7 8.92 7 12v5l-2 2v1h14v-1l-2-2z" />
  </svg>
);

const GearIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const PlaySolidIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);


export default function ConversationDashboard() {
  return (
    <div className="cd-root">
      {/* Sidebar */}
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
          <a href="#conversations" className="cd-nav-item active"><ChatBubbleIcon /> Conversations</a>
          <a href="#lectures" className="cd-nav-item"><PlayOutlineIcon /> Lectures</a>
          <a href="#slides" className="cd-nav-item"><FileUpIcon /> Slides</a>
          <a href="#data" className="cd-nav-item"><BarChartIcon /> Classroom Data</a>
          <a href="#archive" className="cd-nav-item"><ArchiveIcon /> Archive</a>
        </nav>

        <div className="cd-nav-bottom">
          <a href="#support" className="cd-nav-item"><SupportIcon /> Support</a>
          <a href="#docs" className="cd-nav-item"><BookIcon /> Documentation</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cd-main">
        {/* Top Navbar */}
        <header className="cd-topbar">
          <div className="cd-topbar-icons">
            <BellIcon />
            <GearIcon />
            <div className="cd-avatar">
              <img src="https://ui-avatars.com/api/?name=Teacher&background=0D8ABC&color=fff&rounded=true&size=28" alt="Profile" />
            </div>
          </div>
        </header>

        {/* 3-Column Layout */}
        <div className="cd-content">
          
          {/* Column 1: History */}
          <div className="cd-column cd-history">
            <h2>History</h2>
            <div className="cd-hx-list">
              
              <div className="cd-hx-item active">
                <h4>Explain quantum entangle...</h4>
                <p>Today, 10:24 AM</p>
              </div>

              <div className="cd-hx-item">
                <h4>Causes of the French Rev...</h4>
                <p>Yesterday</p>
              </div>

              <div className="cd-hx-item">
                <h4>Calculus limits intuition</h4>
                <p>Prev 7 Days</p>
              </div>

              <div className="cd-hx-item">
                <h4>Photosynthesis vs Cellular...</h4>
                <p>Prev 7 Days</p>
              </div>

            </div>
          </div>

          {/* Column 2: Chat Area */}
          <div className="cd-column cd-chat">
            <div className="cd-chat-messages">
              
              <div className="cd-msg ai">
                Hello. I'm ready to assist with today's study plan. We were last reviewing the mechanics of cellular respiration. Would you like to continue there, or explore a new topic?
              </div>

              <div className="cd-msg user">
                Can we go over the light-dependent reactions of photosynthesis first? I'm getting it confused with the Calvin cycle.
              </div>

              <div className="cd-msg ai">
                <p style={{marginTop: 0}}>Certainly. It's a common area of confusion. Let's break it down logically.</p>
                <p style={{marginBottom: 0}}>The <strong>light-dependent reactions</strong> occur in the thylakoid membrane and strictly require solar energy. Their primary purpose is to capture that energy and convert it into chemical energy carriers: ATP and NADPH. Think of it as charging the batteries.</p>
              </div>

            </div>

            {/* Input Area */}
            <div className="cd-input-wrapper">
              <div className="cd-input-container">
                <input type="text" placeholder="Ask your doubt..." />
                <span className="cd-icon-clip"><PaperclipIcon /></span>
                <button className="cd-btn-send">
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Sources */}
          <div className="cd-column cd-sources">
            <h2>Sources</h2>
            
            {/* Source Card PDF */}
            <div className="cd-src-card">
              <div className="cd-src-head">
                <span className="cd-src-badge pdf">PDF</span>
                <span className="cd-src-link"><ExternalLinkIcon /></span>
              </div>
              <h4>Ch 8: Photosynthesis & Respiration Overview</h4>
              <p>The light-dependent reactions convert solar energy into chemical energy in the form of ATP and...</p>
            </div>

            {/* Source Card Video */}
            <div className="cd-src-card">
              <div className="cd-src-head">
                <span className="cd-src-badge video">Video</span>
                <span className="cd-src-link"><ExternalLinkIcon /></span>
              </div>
              <h4>Lecture 4 Recording:<br/>Bioenergetics Deep Dive</h4>
              <div className="cd-src-video-thumb">
                 <PlaySolidIcon />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
