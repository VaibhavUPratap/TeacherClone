import React from "react";
import "./LecturesDashboard.css";

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
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 6-6" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20a10 10 0 100-20 10 10 0 000 20zM21 21l-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2zm9-4v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.68C8.63 6.36 7 8.92 7 12v5l-2 2v1h14v-1l-2-2z" />
  </svg>
);

const GearIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.22-.07.49.12.61l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39-.96c.22-.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const UserSilhouetteIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const PlayDocIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const SyncIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
  </svg>
);

const BookBookmarkIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
  </svg>
);

const FlaskIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const CloudIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

const MoreVertIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

// ─── COMPONENT ───────────────────────────────────────────

export default function LecturesDashboard() {
  return (
    <div className="ld-root">
      {/* Sidebar */}
      <aside className="ld-sidebar">
        <div className="ld-brand">
          <h1>TEACHERCLONE</h1>
          <p>ACADEMIC WORKSPACE</p>
        </div>

        <button className="ld-btn-new">
          <PlusIcon /> New Session
        </button>

        <nav className="ld-nav">
          <a href="#resources" className="ld-nav-item"><FolderIcon /> Resources</a>
          <a href="#conversations" className="ld-nav-item"><ChatBubbleIcon /> Conversations</a>
          <a href="#lectures" className="ld-nav-item active"><GraduationCapIcon /> Lectures</a>
          <a href="#slides" className="ld-nav-item"><SlidesIcon /> Slides</a>
          <a href="#data" className="ld-nav-item"><LineChartIcon /> Classroom Data</a>
          <a href="#archive" className="ld-nav-item"><ArchiveIcon /> Archive</a>
        </nav>

        <div className="ld-profile">
          <div className="ld-avatar">
            <UserSilhouetteIcon />
          </div>
          <div className="ld-profile-info">
            <h4>Dr. Aris Thorne</h4>
            <p>Professor of History</p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="ld-main">
        {/* Top Navbar */}
        <header className="ld-topbar">
          <div className="ld-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search sessions..." className="ld-search-input" />
          </div>
          <div className="ld-topbar-icons">
            <BellIcon />
            <GearIcon />
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="ld-content">
          {/* Header Row */}
          <div className="ld-header">
            <div>
              <h2 className="ld-page-title">Lectures</h2>
              <p className="ld-page-subtitle">Manage and review teaching sessions</p>
            </div>
            <div className="ld-header-actions">
              <button className="ld-btn-transparent">Add Slides</button>
              <button className="ld-btn-primary">Upload Lecture</button>
            </div>
          </div>

          <div className="ld-grid">
            {/* Left Column (List) */}
            <div className="ld-col-left">
              
              {/* Card 1 */}
              <div className="ld-lecture-card">
                <div className="ld-card-icon-container">
                  <PlayDocIcon />
                </div>
                <div className="ld-card-content">
                  <div className="ld-card-title-row">
                    <h3>Quantum Mechanics: Observables &amp; Operators</h3>
                    <span className="ld-badge ready">• READY</span>
                  </div>
                  <p className="ld-card-date">Recorded on Oct 24, 2023 • 10:30 AM</p>
                  <div className="ld-card-meta">
                    <span className="ld-meta-item"><CheckCircleIcon /> Video Uploaded</span>
                    <span className="ld-meta-item"><FileIcon /> 12 Slides attached</span>
                  </div>
                </div>
                <button className="ld-card-more"><MoreVertIcon /></button>
              </div>

              {/* Card 2 */}
              <div className="ld-lecture-card">
                <div className="ld-card-icon-container processing-icon">
                  <SyncIcon />
                </div>
                <div className="ld-card-content">
                  <div className="ld-card-title-row">
                    <h3>Advanced Thermodynamics - Seminar 4</h3>
                    <span className="ld-badge processing">• PROCESSING</span>
                  </div>
                  <p className="ld-card-date">Recorded today • 09:15 AM</p>
                  <div className="ld-card-meta">
                    <span className="ld-meta-item processing-text"><CloudIcon /> Analyzing Audio...</span>
                  </div>
                </div>
                <button className="ld-card-more"><MoreVertIcon /></button>
              </div>

              {/* Card 3 */}
              <div className="ld-lecture-card">
                <div className="ld-card-icon-container">
                  <BookBookmarkIcon />
                </div>
                <div className="ld-card-content">
                  <div className="ld-card-title-row">
                    <h3>Historiography of the Industrial Revolution</h3>
                    <span className="ld-badge ready">• READY</span>
                  </div>
                  <p className="ld-card-date">Recorded on Oct 22, 2023 • 02:00 PM</p>
                  <div className="ld-card-meta">
                    <span className="ld-meta-item"><CheckCircleIcon /> Video Uploaded</span>
                    <span className="ld-meta-item"><FileIcon /> 8 Slides attached</span>
                  </div>
                </div>
                <button className="ld-card-more"><MoreVertIcon /></button>
              </div>

              {/* Card 4 */}
              <div className="ld-lecture-card">
                <div className="ld-card-icon-container">
                  <FlaskIcon />
                </div>
                <div className="ld-card-content">
                  <div className="ld-card-title-row">
                    <h3>Chemical Bonding and Molecular Geometry</h3>
                    <span className="ld-badge ready">• READY</span>
                  </div>
                  <p className="ld-card-date">Recorded on Oct 20, 2023 • 11:00 AM</p>
                  <div className="ld-card-meta">
                    <span className="ld-meta-item"><CheckCircleIcon /> Video Uploaded</span>
                  </div>
                </div>
                <button className="ld-card-more"><MoreVertIcon /></button>
              </div>

            </div>

            {/* Right Column (Overview & Insights) */}
            <div className="ld-col-right">
              
              {/* Overview Card */}
              <div className="ld-overview-card">
                <h4 className="ld-oc-title">OVERVIEW</h4>
                
                <div className="ld-oc-main-stat">
                  <h2>42</h2>
                  <p>Total Lectures Uploaded</p>
                </div>
                
                <div className="ld-oc-split-stats">
                  <div>
                    <h3>8</h3>
                    <p>PROCESSED</p>
                  </div>
                  <div>
                    <h3>2</h3>
                    <p>PENDING</p>
                  </div>
                </div>

                <div className="ld-oc-footer">
                  <p className="ld-ocf-label">Last Uploaded</p>
                  <p className="ld-ocf-date">Today at 09:15 AM</p>
                  <p className="ld-ocf-desc">Advanced Thermodynamics</p>
                </div>
              </div>

              {/* AI Insights Card */}
              <div className="ld-insights-card">
                <h4 className="ld-ic-title"><SparkleIcon /> AI INSIGHTS</h4>
                <p className="ld-ic-text">
                  Your recent lectures show a 15% increase in student engagement during the Q&amp;A sessions.
                </p>
                <a href="#analytics" className="ld-ic-link">View Analytics</a>
              </div>

              {/* Classroom Insights image card */}
              <div className="ld-classroom-img-card">
                <div className="ld-cic-content">
                  <h4>Classroom Insights</h4>
                  <p>Analyze student participation</p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Floating Pill */}
          <div className="ld-floating-pill-container">
            <div className="ld-floating-pill">
              <InfoCircleIcon /> 2 sessions are currently processing in the background
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
