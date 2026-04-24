import React, { useState, useEffect, useRef } from "react";
import { apiRequest } from "../../api/api";
import { 
  Plus, 
  Video, 
  FileText, 
  MoreHorizontal, 
  PlayCircle, 
  Upload, 
  BarChart3, 
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <motion.div 
    className="glass-card stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
  >
    <div className="stat-header">
      <div className={`stat-icon-wrapper ${color}`}>
        <Icon size={20} />
      </div>
      <button className="more-btn"><MoreHorizontal size={18} /></button>
    </div>
    <div className="stat-body">
      <h3>{value}</h3>
      <p className="stat-title">{title}</p>
      <p className="stat-subtitle">{subtitle}</p>
    </div>
  </motion.div>
);

export default function ResourceDashboard() {
  const [stats, setStats] = useState({
    total_questions: 0,
    top_topics: [],
    weak_areas: [],
    recent_questions: []
  });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiRequest("/dashboard/");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("http://localhost:8000/ingest/file", {
        method: "POST",
        body: formData,
      });
      alert(`File "${file.name}" uploaded and being processed!`);
      const data = await apiRequest("/dashboard/");
      setStats(data);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="resources-page fade-in">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept=".pdf,.txt"
      />

      <header className="page-header">
        <div className="header-text">
          <h2>Resources</h2>
          <p>Manage teaching content and academic data sources</p>
        </div>
        <div className="header-actions">
          <motion.button 
            className="btn-secondary glass" 
            onClick={handleUploadClick} 
            disabled={isUploading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload size={18} />
            {isUploading ? "Uploading..." : "Upload Slides"}
          </motion.button>
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video size={18} />
            Upload Video
          </motion.button>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="grid-main">
          <div className="stats-row">
            <StatCard 
              title="Knowledge Base" 
              value={stats.total_questions} 
              subtitle="Entries processed" 
              icon={FileText} 
              color="blue" 
            />
            <StatCard 
              title="Last Synced" 
              value="Just Now" 
              subtitle="Real-time updates" 
              icon={Activity} 
              color="purple" 
            />
          </div>

          <section className="glass-card table-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_questions.map((q, i) => (
                    <tr key={i}>
                      <td>
                        <div className="type-icon-wrapper purple">
                          <PlayCircle size={16} />
                        </div>
                      </td>
                      <td className="content-cell">{q.question}</td>
                      <td>{q.timestamp || "Today"}</td>
                      <td>
                        <span className="badge-status success">
                          <CheckCircle2 size={12} />
                          Processed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="grid-sidebar">
          <section className="glass-card info-card system-status">
            <h3>System Status</h3>
            <div className="status-item">
              <span className="label">Backend</span>
              <span className="value online">Online</span>
            </div>
            <div className="status-item">
              <span className="label">AI Model</span>
              <span className="value">Llama 3</span>
            </div>
            <div className="status-item">
              <span className="label">Vector DB</span>
              <span className="value">Synced</span>
            </div>
          </section>

          <section className="glass-card info-card interests">
            <h3>Top Interests</h3>
            <div className="topics-list">
              {stats.top_topics.map((topic, i) => (
                <span key={i} className="topic-pill">{topic}</span>
              ))}
              {stats.top_topics.length === 0 && <p className="empty-text">No topics identified yet.</p>}
            </div>
          </section>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .resources-page {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .header-text h2 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .header-text p {
          color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid var(--border-color);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 32px;
        }

        .grid-main {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .stat-card {
          padding: 24px;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-wrapper.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .stat-icon-wrapper.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .stat-body h3 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .stat-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 2px;
        }

        .stat-subtitle {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .table-section {
          padding: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .view-all {
          font-size: 0.875rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 12px 16px;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-tertiary);
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border-color);
        }

        td {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.875rem;
        }

        .content-cell {
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
        }

        .type-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .type-icon-wrapper.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-status.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .grid-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          padding: 24px;
        }

        .info-card h3 {
          font-size: 1rem;
          margin-bottom: 20px;
          color: var(--text-secondary);
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .status-item:last-child { border: none; }

        .status-item .label { color: var(--text-tertiary); font-size: 0.875rem; }
        .status-item .value { font-weight: 600; font-size: 0.875rem; }
        .status-item .value.online { color: #10b981; }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .topic-pill {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .empty-text {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          font-style: italic;
        }
      `}} />
    </div>
  );
}
