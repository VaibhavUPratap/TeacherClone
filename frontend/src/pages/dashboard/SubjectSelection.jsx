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
    <div className="subject-selection-page fade-in">
      <header className="subject-select-header">
        <div>
          <h2>Subject-Wise Teacher Selection</h2>
          <p>
            Choose your subjects below to find specialized instructors. You can modify these selections later in your course settings.
          </p>
        </div>
        
        <div className="subject-select-semester-wrapper">
          <span>Semester:</span>
          <select className="subject-select-semester-select">
            <option value="fall-2024">Fall 2024</option>
            <option value="spring-2025">Spring 2025</option>
          </select>
        </div>
      </header>

      <div className="subject-select-grid">
        {SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          const Icon = subject.icon;
          
          return (
            <div 
              key={subject.id} 
              className="subject-select-card"
              style={isSelected ? { borderColor: subject.color, backgroundColor: 'var(--color-paper-3)' } : {}}
            >
              {isSelected && (
                <div 
                  className="subject-select-badge"
                  style={{ backgroundColor: subject.color }}
                >
                  Selected
                </div>
              )}

              <div 
                className="subject-select-icon"
                style={{
                  backgroundColor: `${subject.color}15`,
                  color: subject.color
                }}
              >
                <Icon size={28} />
              </div>

              <h3>{subject.name}</h3>
              
              <p>{subject.description}</p>

              <div className="subject-select-tags">
                <span className="subject-select-tag">
                  {subject.teachers} Teachers
                </span>
                <span 
                  className="subject-select-tag"
                  style={{
                    backgroundColor: `${subject.color}15`,
                    color: subject.color
                  }}
                >
                  {subject.type}
                </span>
              </div>

              <button 
                onClick={() => toggleSubject(subject.id)}
                className="subject-select-btn"
                style={isSelected ? {
                  backgroundColor: subject.color,
                  color: '#fff',
                  border: 'none'
                } : {
                  borderColor: subject.color,
                  color: subject.color
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
