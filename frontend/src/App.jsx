import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import Resources from './pages/dashboard/Resources';
import Conversations from './pages/dashboard/Conversations';
import Lectures from './pages/dashboard/Lectures';
import Slides from './pages/dashboard/Slides';
import ClassData from './pages/dashboard/ClassData';
import Archive from './pages/dashboard/Archive';

// Temporary placeholders for other pages
const Placeholder = ({ title }) => (
  <div className="fade-in">
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
    <div className="glass-card" style={{ padding: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
      <p style={{ color: 'var(--text-secondary)' }}>Coming Soon: This module is under construction.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Resources />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="lectures" element={<Lectures />} />
          <Route path="slides" element={<Slides />} />
          <Route path="data" element={<ClassData />} />
          <Route path="archive" element={<Archive />} />
        </Route>

        {/* Redirect root to login for now, or dashboard if auth exists */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
