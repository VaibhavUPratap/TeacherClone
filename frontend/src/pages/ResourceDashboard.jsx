import React from "react";
import "./ResourceDashboard.css";

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

const GridIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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

const MoreIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 12a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM22 12a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PlayCircleFilled = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClapperboardIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const SyncIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const DocumentAddIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const DotIcon = () => (
  <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
  </svg>
);


export default function ResourceDashboard() {
  return (
    <div className="rd-root">
      {/* Sidebar */}
      <aside className="rd-sidebar">
        <div className="rd-brand">
          <h1>TEACHERCLONE</h1>
          <p>Academic Engine</p>
        </div>

        <button className="rd-btn-new">
          <PlusIcon /> New Session
        </button>

        <nav className="rd-nav">
          <a href="#resources" className="rd-nav-item active"><FolderIcon /> Resources</a>
          <a href="#workspace" className="rd-nav-item"><GridIcon /> Workspace</a>
          <a href="#lectures" className="rd-nav-item"><PlayOutlineIcon /> Lectures</a>
          <a href="#slides" className="rd-nav-item"><FileUpIcon /> Slides</a>
          <a href="#data" className="rd-nav-item"><BarChartIcon /> Classroom Data</a>
          <a href="#archive" className="rd-nav-item"><ArchiveIcon /> Archive</a>
        </nav>

        <div className="rd-nav-bottom">
          <a href="#support" className="rd-nav-item"><SupportIcon /> Support</a>
          <a href="#docs" className="rd-nav-item"><BookIcon /> Documentation</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="rd-main">
        {/* Header */}
        <header className="rd-header">
          <div>
            <h2 className="rd-page-title">Resources</h2>
            <p className="rd-page-subtitle">Manage teaching content and data sources</p>
          </div>
          <div className="rd-header-actions">
            <button className="rd-btn-secondary">Import Classroom Data</button>
            <button className="rd-btn-secondary">Upload Slides</button>
            <button className="rd-btn-primary">Upload Video</button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="rd-grid">
          {/* Left Column */}
          <div className="rd-col-left">
            {/* Lecture Videos Card */}
            <section className="rd-card">
              <div className="rd-card-header">
                <h3 className="rd-card-title">Lecture Videos</h3>
                <div style={{color: '#a1a1aa'}}><MoreIcon /></div>
              </div>
              <div className="rd-lv-list">
                <div className="rd-lv-item">
                  <div className="rd-lv-icon">
                    <PlayCircleFilled />
                  </div>
                  <div className="rd-lv-details">
                    <span className="rd-lv-title">Advanced Calculus - Week 3</span>
                    <span className="rd-lv-meta">1h 45m</span>
                  </div>
                  <span className="rd-badge ready">Ready</span>
                </div>
                <div className="rd-lv-item">
                  <div className="rd-lv-icon orange">
                    <ClapperboardIcon />
                  </div>
                  <div className="rd-lv-details">
                    <span className="rd-lv-title">Linear Algebra - Vectors</span>
                    <span className="rd-lv-meta">52m</span>
                  </div>
                  <span className="rd-badge processing">
                    <SyncIcon /> Processing
                  </span>
                </div>
              </div>
            </section>

            {/* Slides & Documents Card */}
            <section className="rd-card">
              <div className="rd-card-header">
                <h3 className="rd-card-title">Slides & Documents</h3>
              </div>
              <div className="rd-sd-grid">
                <div className="rd-sd-item">
                  <div className="rd-sd-icon">
                    <FileTextIcon />
                  </div>
                  <div className="rd-sd-content">
                    <h4 className="rd-sd-title">Week 3 Notation Guide.pdf</h4>
                    <p className="rd-sd-meta">12 pages • Ready</p>
                  </div>
                </div>
                <div className="rd-sd-item item-blue">
                  <div className="rd-sd-icon">
                    <FileTextIcon />
                  </div>
                  <div className="rd-sd-content">
                    <h4 className="rd-sd-title">Syllabus_Fall2024.pdf</h4>
                    <p className="rd-sd-meta">4 pages • Ready</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="rd-col-right">
            {/* Classroom Interactions Card */}
            <section className="rd-card rd-ci-card">
              <div className="rd-card-header">
                <h3 className="rd-card-title">Classroom<br/>Interactions</h3>
              </div>
              <p className="rd-ci-desc">Imported communication and<br/>discussions</p>
              
              <div className="rd-ci-stat">
                <span className="rd-ci-stat-label">Last synced</span>
                <span className="rd-ci-stat-val">2 hours ago</span>
              </div>
              <div className="rd-ci-stat">
                <span className="rd-ci-stat-label">Entries</span>
                <span className="rd-ci-stat-val">1,402</span>
              </div>

              <div className="rd-ci-actions">
                <button className="rd-btn-outline"><MailIcon /> Import Emails</button>
                <button className="rd-btn-outline"><DocumentAddIcon /> Upload Notes</button>
              </div>
            </section>

            {/* System Status Card */}
            <section className="rd-card rd-ss-card">
              <div className="rd-card-header" style={{ marginBottom: '12px' }}>
                <span className="rd-ss-title">SYSTEM STATUS</span>
              </div>
              <div className="rd-ss-row">
                <span className="rd-ss-label">Videos</span>
                <span className="rd-ss-val rd-ss-val-blue">4/5 processed</span>
              </div>
              <div className="rd-ss-row" style={{ padding: '8px 0' }}>
                <span className="rd-ss-label">Slides</span>
                <span className="rd-ss-val">3/3 processed</span>
              </div>
              <div className="rd-ss-row">
                <span className="rd-ss-label">Classroom data</span>
                <span className="rd-ss-val">synced</span>
              </div>
            </section>
          </div>
        </div>

        {/* All Resources Table */}
        <section className="rd-all-resources">
          <h3 className="rd-ar-title">All Resources</h3>
          <div className="rd-table-wrapper">
            <table className="rd-ar-table">
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>FILE NAME</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="rd-tb-icon blue"><PlayCircleFilled /></div></td>
                  <td style={{fontWeight: 500}}>Advanced Calculus - Week 3 Lecture.mp4</td>
                  <td style={{color: '#a1a1aa'}}>Oct 24, 2023</td>
                  <td>
                    <span className="rd-status ready">
                      <DotIcon /> Ready
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><div className="rd-tb-icon blue"><FileTextIcon /></div></td>
                  <td style={{fontWeight: 500}}>Week 3 Notation Guide.pdf</td>
                  <td style={{color: '#a1a1aa'}}>Oct 23, 2023</td>
                  <td>
                    <span className="rd-status ready">
                      <DotIcon /> Ready
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><div className="rd-tb-icon"><ClapperboardIcon /></div></td>
                  <td style={{fontWeight: 500}}>Linear Algebra - Vectors Intro.mp4</td>
                  <td style={{color: '#a1a1aa'}}>Oct 25, 2023</td>
                  <td>
                    <span className="rd-status processing">
                      <SyncIcon /> Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><div className="rd-tb-icon" style={{color: '#52525b'}}><BarChartIcon /></div></td>
                  <td style={{fontWeight: 500}}>Forum Export Q3_Discuss.csv</td>
                  <td style={{color: '#a1a1aa'}}>Oct 20, 2023</td>
                  <td>
                    <span className="rd-status error">
                      <AlertIcon /> Error
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
