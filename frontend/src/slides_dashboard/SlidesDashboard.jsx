import React from "react";
import "./SlidesDashboard.css";

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

const GearIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.22-.07.49.12.61l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39-.96c.22-.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const SupportIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloudUploadIcon = () => (
  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-1.3l-.85-.6A6.997 6.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
  </svg>
);

const DotIcon = () => (
  <svg width="8" height="8" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

// ─── COMPONENT ───────────────────────────────────────────

export default function SlidesDashboard() {
  return (
    <div className="sd-root">
      
      {/* ────────────────── SIDEBAR ────────────────── */}
      <aside className="sd-sidebar">
        <div className="sd-brand">
          <h1>TeacherClone</h1>
          <p>ACADEMIC WORKSPACE</p>
        </div>

        <button className="sd-btn-new">
          <PlusIcon /> New Material
        </button>

        <nav className="sd-nav">
          <a href="#resources" className="sd-nav-item"><FolderIcon /> Resources</a>
          <a href="#conversations" className="sd-nav-item"><ChatBubbleIcon /> Conversations</a>
          <a href="#lectures" className="sd-nav-item"><GraduationCapIcon /> Lectures</a>
          <a href="#slides" className="sd-nav-item active"><SlidesIcon /> Slides</a>
          <a href="#data" className="sd-nav-item"><LineChartIcon /> Classroom Data</a>
          <a href="#archive" className="sd-nav-item"><ArchiveIcon /> Archive</a>
        </nav>

        <div className="sd-nav-bottom">
          <a href="#settings" className="sd-nav-item menu-bottom"><GearIcon /> Settings</a>
          <a href="#support" className="sd-nav-item menu-bottom"><SupportIcon /> Support</a>
          
          <div className="sd-profile">
            <img 
              src="https://ui-avatars.com/api/?name=Prof+Aris&background=fff&color=000&rounded=true&size=32" 
              alt="Prof. Aris" 
              className="sd-avatar" 
            />
            <span className="sd-profile-name">Prof. Aris</span>
          </div>
        </div>
      </aside>

      {/* ────────────────── MAIN CONTENT ────────────────── */}
      <main className="sd-main">
        <div className="sd-main-inner">
          
          {/* Header Row */}
          <header className="sd-header">
            <div>
              <h2 className="sd-page-title">Slides &amp; Materials</h2>
              <p className="sd-page-subtitle">Manage lecture presentations and teaching documents</p>
            </div>
            <div className="sd-header-actions">
              <button className="sd-btn-secondary">Add Material</button>
              <button className="sd-btn-primary">Upload Slides</button>
            </div>
          </header>

          {/* Masonry Grid */}
          <div className="sd-masonry">
            
            {/* Card 1 */}
            <div className="sd-card">
              <div className="sd-card-thumb thumb-code">
                <span className="sd-badge badge-pdf">PDF</span>
              </div>
              <div className="sd-card-info">
                <h3>Introduction to Algorithms.pdf</h3>
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-text">
                    <p>24 slides</p>
                    <p>Uploaded 2 days ago</p>
                  </div>
                  <span className="sd-status ready"><DotIcon /> READY</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="sd-card sd-card-tall">
              <div className="sd-card-thumb thumb-dark">
                <CloudUploadIcon className="sd-icon-cloud" />
              </div>
              <div className="sd-card-info">
                <h3>Advanced_Microservices_v2.zip</h3>
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-text">
                    <p>-- assets</p>
                    <p>Uploading...</p>
                  </div>
                  <span className="sd-status queue"><DotIcon /> QUEUE</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="sd-card">
              <div className="sd-card-thumb thumb-charts">
                <span className="sd-badge badge-pptx">PPTX</span>
              </div>
              <div className="sd-card-info">
                <h3>Distributed Systems_Week4.pptx</h3>
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-text">
                    <p>18 slides</p>
                    <p>Uploaded 5 hours ago</p>
                  </div>
                  <span className="sd-status processing"><DotIcon /> PROCESSING</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="sd-card">
              <div className="sd-card-thumb thumb-docx">
                <span className="sd-badge badge-docx">DOCX</span>
              </div>
              <div className="sd-card-info">
                <h3>Syllabus_ComputerVision.docx</h3>
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-text">
                    <p>12 pages</p>
                    <p>Uploaded 3 days ago</p>
                  </div>
                  <span className="sd-status ready"><DotIcon /> READY</span>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="sd-card sd-card-shifted">
              <div className="sd-card-thumb thumb-graphic">
                <span className="sd-badge badge-pdf">PDF</span>
              </div>
              <div className="sd-card-info">
                <h3>Information Theory Master.pdf</h3>
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-text">
                    <p>42 slides</p>
                    <p>Uploaded 1 week ago</p>
                  </div>
                  <span className="sd-status ready"><DotIcon /> READY</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ────────────────── RIGHT COLUMN ────────────────── */}
      <aside className="sd-right-rail">
        <h4 className="sd-rr-title">WORKPLACE STATS</h4>
        
        <div className="sd-rr-stat-block">
          <p className="sd-rr-label">TOTAL DOCUMENTS</p>
          <h2 className="sd-rr-number">42</h2>
        </div>

        <div className="sd-rr-section">
          <p className="sd-rr-label">RECENTLY ADDED</p>
          <div className="sd-rr-recent-card">
            <h4>Quantum_Physics_Final.pdf</h4>
            <p>Added 12m ago</p>
          </div>
        </div>

        <div className="sd-rr-progress-section">
          <div className="sd-rr-progress-row">
            <span>Files Processed</span>
            <span className="sd-val-processed">10</span>
          </div>
          <div className="sd-progress-bar">
            <div className="sd-progress-fill p-90"></div>
          </div>

          <div className="sd-rr-progress-row">
            <span>Pending Sync</span>
            <span className="sd-val-pending">2</span>
          </div>
          <div className="sd-progress-bar">
            <div className="sd-progress-fill p-20 pending-fill"></div>
          </div>
        </div>

        <div className="sd-rr-tip-card">
          <div className="sd-tip-icon">
            <LightbulbIcon />
          </div>
          <p className="sd-tip-text">
            Try organizing materials into <span className="sd-highlight">Collection Folders</span> for easier retrieval during live lectures.
          </p>
        </div>
      </aside>

    </div>
  );
}
