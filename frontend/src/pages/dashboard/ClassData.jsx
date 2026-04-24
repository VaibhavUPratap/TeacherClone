import React from 'react';
import { BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', engagement: 4000, resolution: 2400 },
  { name: 'Tue', engagement: 3000, resolution: 1398 },
  { name: 'Wed', engagement: 2000, resolution: 9800 },
  { name: 'Thu', engagement: 2780, resolution: 3908 },
  { name: 'Fri', engagement: 1890, resolution: 4800 },
  { name: 'Sat', engagement: 2390, resolution: 3800 },
  { name: 'Sun', engagement: 3490, resolution: 4300 },
];

export default function ClassData() {
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
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <p className="label">Active Students</p>
              <h4>124</h4>
            </div>
          </div>
          <div className="glass-card stat-item">
            <div className="stat-icon blue"><BarChart3 size={20} /></div>
            <div>
              <p className="label">Avg. Doubt Resolution</p>
              <h4>94%</h4>
            </div>
          </div>
          <div className="glass-card stat-item alert">
            <div className="stat-icon orange"><AlertTriangle size={20} /></div>
            <div>
              <p className="label">Weak Areas</p>
              <h4>3 Topics Identified</h4>
            </div>
          </div>
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
      `}} />
    </div>
  );
}
