import React, { useState } from 'react';
import { Calculator, Atom, FlaskConical, Code, Brain } from 'lucide-react';

const SUBJECTS = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Calculus, Linear Algebra, and Discrete Math fundamentals.',
    teachers: 12,
    type: 'Core',
    color: '#3b82f6',
    icon: Calculator
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Classical mechanics, electromagnetism, and quantum physics.',
    teachers: 8,
    type: 'Core',
    color: '#8b5cf6',
    icon: Atom
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Organic, inorganic, and physical chemistry principles.',
    teachers: 6,
    type: 'Elective',
    color: '#10b981',
    icon: FlaskConical
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Python, Java, C++, and software development best practices.',
    teachers: 15,
    type: 'Core',
    color: '#f59e0b',
    icon: Code
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    description: 'Neural networks, deep learning, and practical AI algorithms.',
    teachers: 4,
    type: 'Elective',
    color: '#ef4444',
    icon: Brain
  }
];

export default function SubjectSelection() {
  const [selectedSubjects, setSelectedSubjects] = useState(['programming']);

  const toggleSubject = (id) => {
    setSelectedSubjects(prev => 
      prev.includes(id) 
        ? prev.filter(subjectId => subjectId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="subject-selection-page fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Subject-Wise Teacher Selection</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Choose your subjects below to find specialized instructors. You can modify these selections later in your course settings.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Semester:</span>
          <select 
            className="glass"
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '8px', 
              color: 'var(--text-primary)',
              outline: 'none',
              border: '1px solid var(--glass-border)'
            }}
          >
            <option value="fall-2024">Fall 2024</option>
            <option value="spring-2025">Spring 2025</option>
          </select>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          const Icon = subject.icon;
          
          return (
            <div 
              key={subject.id} 
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: isSelected ? `2px solid ${subject.color}` : '1px solid var(--glass-border)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.03)' : 'transparent'
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '-0.75rem',
                  right: '-0.75rem',
                  backgroundColor: subject.color,
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Selected
                </div>
              )}

              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                backgroundColor: `${subject.color}15`,
                color: subject.color
              }}>
                <Icon size={28} />
              </div>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{subject.name}</h3>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem' }}>
                {subject.description}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)'
                }}>
                  {subject.teachers} Teachers
                </span>
                <span style={{
                  background: `${subject.color}15`,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: subject.color
                }}>
                  {subject.type}
                </span>
              </div>

              <button 
                onClick={() => toggleSubject(subject.id)}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: isSelected ? 'none' : `2px solid ${subject.color}`,
                  backgroundColor: isSelected ? subject.color : 'transparent',
                  color: isSelected ? '#fff' : subject.color
                }}
              >
                {isSelected ? 'Selected' : 'Select Subject'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
