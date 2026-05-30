import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Zap, BookOpen, Clock, Activity, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { name: 'Mon', accuracy: 65, duration: 45 },
    { name: 'Tue', accuracy: 70, duration: 60 },
    { name: 'Wed', accuracy: 68, duration: 30 },
    { name: 'Thu', accuracy: 82, duration: 90 },
    { name: 'Fri', accuracy: 78, duration: 50 },
    { name: 'Sat', accuracy: 85, duration: 120 },
    { name: 'Sun', accuracy: 88, duration: 80 },
  ];

  const subjectStrengths = [
    { subject: 'Math', mastery: 85, fullMark: 100 },
    { subject: 'Physics', mastery: 65, fullMark: 100 },
    { subject: 'Chemistry', mastery: 50, fullMark: 100 },
    { subject: 'Programming', mastery: 90, fullMark: 100 },
    { subject: 'ML', mastery: 40, fullMark: 100 },
  ];

  const statCards = [
    { title: "Concepts Mastered", value: "34", icon: CheckCircle, color: "#10b981", trend: "+12% this week" },
    { title: "Current Streak", value: "5 Days", icon: Zap, color: "#f59e0b", trend: "Top 20% in class" },
    { title: "Doubts Resolved", value: "128", icon: Target, color: "#3b82f6", trend: "+4 from yesterday" },
    { title: "Learning Hours", value: "24.5h", icon: Clock, color: "#8b5cf6", trend: "This month" }
  ];

  const recommendations = [
    {
      type: "critical",
      title: "Revise Thermodynamics",
      desc: "You've missed 4 questions on this topic recently. Dr. Rao has a great 15-min visual breakdown.",
      subject: "Physics",
      action: "Start Revision"
    },
    {
      type: "warning",
      title: "Calculus Quiz Pending",
      desc: "Your mastery in integration by parts is dropping. Test your knowledge to maintain your streak.",
      subject: "Mathematics",
      action: "Take Quiz"
    },
    {
      type: "success",
      title: "Ahead of Schedule",
      desc: "You are mastering Programming 20% faster than the syllabus pace! Want to try advanced concepts?",
      subject: "Programming",
      action: "View Advanced"
    }
  ];

  return (
    <div className="student-analytics-page fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Your Learning Analytics</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Track your progress, identify weak areas, and get personalized recommendations.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['overview', 'subjects', 'history'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="glass"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                textTransform: 'capitalize',
                background: activeTab === tab ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i} 
              className="glass-card" 
              style={{ padding: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: `${stat.color}20`, padding: '0.5rem', borderRadius: '8px', color: stat.color }}>
                  <Icon size={24} />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{stat.trend}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</h3>
            </motion.div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Performance Chart */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Learning Consistency & Accuracy</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(30, 41, 59, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" name="Accuracy %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={18} color="#8b5cf6" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Skill Distribution</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectStrengths}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Radar name="Mastery" dataKey="mastery" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(30, 41, 59, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} color="var(--accent-primary)" />
          Smart Recommendations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {recommendations.map((rec, i) => {
            const isCritical = rec.type === 'critical';
            const isWarn = rec.type === 'warning';
            
            let color = '#10b981'; // success
            if (isCritical) color = '#ef4444';
            if (isWarn) color = '#f59e0b';
            
            return (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', borderTop: \`4px solid \${color}\` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: color, letterSpacing: '0.5px' }}>
                    {rec.subject}
                  </span>
                  {isCritical && <AlertTriangle size={16} color={color} />}
                  {isWarn && <TrendingUp size={16} color={color} />}
                  {!isCritical && !isWarn && <Sparkles size={16} color={color} />}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{rec.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {rec.desc}
                </p>
                <button 
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: \`\${color}20\`,
                    color: color,
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  {rec.action}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}