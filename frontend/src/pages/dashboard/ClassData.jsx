import React, { useState, useEffect } from 'react';
import { BarChart3, Users, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { apiRequest } from '../../api/api';

export default function ClassData() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiRequest("/dashboard");
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data if real data is sparse, or use recent questions count
  const chartData = [
    { name: 'Mon', engagement: 4000 },
    { name: 'Tue', engagement: 3000 },
    { name: 'Wed', engagement: 2000 },
    { name: 'Thu', engagement: 2780 },
    { name: 'Fri', engagement: 1890 },
    { name: 'Sat', engagement: 2390 },
    { name: 'Sun', engagement: 3490 },
  ];

  if (loading) return <div className="loading-state glass-card"><Loader2 className="animate-spin" /> Loading Class Data...</div>;

  return (
    <div className="class-data-page fade-in">
      <header className="page-header">
        <div className="header-text">
          <h2>Classroom Data</h2>
          <p>Analytics and engagement insights from your students</p>
        </div>
      </header>

      <div className="analytics-grid">
        <motion.div className="glass-card chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="chart-header">
            <h3><TrendingUp size={18} /> Engagement Over Time</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-tertiary)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="var(--accent-primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEngage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="side-stats">
          <div className="glass-card stat-item">
            <div className="stat-icon purple"><Users size={20} /></div>
            <div>
              <p className="label">Total Questions</p>
              <h4>{stats?.total_questions || 0}</h4>
            </div>
          </div>
          <div className="glass-card stat-item">
            <div className="stat-icon blue"><BarChart3 size={20} /></div>
            <div>
              <p className="label">Top Topic</p>
              <h4>{stats?.top_topics?.[0] || "None"}</h4>
            </div>
          </div>
          <div className="glass-card stat-item alert">
            <div className="stat-icon orange"><AlertTriangle size={20} /></div>
            <div>
              <p className="label">Weak Areas</p>
              <h4>{stats?.weak_areas?.length || 0} Topics Identified</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activity glass-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {stats?.recent_questions?.length > 0 ? (
            stats.recent_questions.map((q, i) => (
              <div key={i} className="activity-row">
                <span className="time">{q.time}</span>
                <span className="question">{q.question}</span>
                <span className="badge">{q.category}</span>
              </div>
            ))
          ) : (
            <p className="no-data">No recent activity found.</p>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .class-data-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-text h2 { font-size: 2rem; margin-bottom: 4px; }
        .header-text p { color: var(--text-secondary); }
        .analytics-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
        .chart-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .chart-header h3 { font-size: 1rem; display: flex; align-items: center; gap: 10px; }
        .chart-container { flex: 1; padding-top: 20px; }
        .side-stats { display: flex; flex-direction: column; gap: 16px; }
        .stat-item { padding: 20px; display: flex; align-items: center; gap: 16px; }
        .stat-icon { 
          width: 44px; height: 44px; border-radius: 12px; display: flex; 
          align-items: center; justify-content: center;
        }
        .stat-icon.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .stat-icon.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .stat-icon.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .stat-item h4 { font-size: 1.25rem; }
        .stat-item .label { font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 2px; }
        
        .recent-activity { padding: 24px; }
        .recent-activity h3 { margin-bottom: 20px; font-size: 1.1rem; }
        .activity-list { display: flex; flex-direction: column; gap: 12px; }
        .activity-row { 
          display: grid; grid-template-columns: 100px 1fr 120px; gap: 16px; 
          padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.02);
          align-items: center;
        }
        .activity-row .time { color: var(--text-tertiary); font-size: 0.8rem; }
        .activity-row .question { color: var(--text-primary); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .activity-row .badge { 
          font-size: 0.7rem; font-weight: 700; text-align: center;
          background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 4px 8px; border-radius: 6px;
        }
        .no-data { color: var(--text-tertiary); text-align: center; padding: 20px; }
        
        .loading-state { height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: var(--accent-primary); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
