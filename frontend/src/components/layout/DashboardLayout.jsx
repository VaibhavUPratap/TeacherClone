import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Video, 
  FileText, 
  BarChart3, 
  Archive, 
  Settings, 
  HelpCircle,
  PlusCircle,
  Library,
  LogOut,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path}>
    <motion.div 
      className={`sidebar-item ${active ? 'active' : ''}`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={20} />
      <span>{label}</span>
      {active && <motion.div layoutId="active-pill" className="active-pill" />}
    </motion.div>
  </Link>
);

export default function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, role, supabase } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar glass">
        <div className="sidebar-header">
          <div className="logo-glow" />
          <h1 className="logo-text">TEACHER<span>CLONE</span></h1>
        </div>

        {role === 'teacher' && (
          <button className="new-session-btn">
            <PlusCircle size={18} />
            <span>New Resource</span>
          </button>
        )}

        <nav className="sidebar-nav">
          <p className="nav-label">{role === 'teacher' ? 'Faculty Menu' : 'Student Dashboard'}</p>
          
          {role === 'teacher' ? (
            <>
              <SidebarItem icon={LayoutDashboard} label="Class Materials" path="/dashboard" active={currentPath === '/dashboard'} />
              <SidebarItem icon={BarChart3} label="Analytics" path="/dashboard/data" active={currentPath === '/dashboard/data'} />
              <SidebarItem icon={FileText} label="Slides Manager" path="/dashboard/slides" active={currentPath === '/dashboard/slides'} />
              <SidebarItem icon={Video} label="Lectures" path="/dashboard/lectures" active={currentPath === '/dashboard/lectures'} />
              <SidebarItem icon={MessageSquare} label="Student Chats" path="/dashboard/conversations" active={currentPath === '/dashboard/conversations'} />
              <SidebarItem icon={Archive} label="Archive" path="/dashboard/archive" active={currentPath === '/dashboard/archive'} />
            </>
          ) : (
            <>
              <SidebarItem icon={LayoutDashboard} label="Choose Teacher" path="/dashboard" active={currentPath === '/dashboard'} />
              <SidebarItem icon={Library} label="Subjects" path="/dashboard/subjects" active={currentPath === '/dashboard/subjects'} />
              <SidebarItem icon={MessageSquare} label="Talk to Teacher" path="/dashboard/interaction" active={currentPath === '/dashboard/interaction'} />
              <SidebarItem icon={BarChart3} label="My Progress" path="/dashboard/analytics" active={currentPath === '/dashboard/analytics'} />
              <SidebarItem icon={Archive} label="History" path="/dashboard/conversations" active={currentPath === '/dashboard/conversations'} />
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <nav className="sidebar-nav">
            <SidebarItem icon={HelpCircle} label="Support" path="/support" active={currentPath === '/support'} />
            <SidebarItem icon={Settings} label="Settings" path="/settings" active={currentPath === '/settings'} />
          </nav>
          
          <div className="user-profile glass">
            <div className="user-avatar">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</p>
              <p className="user-role">{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Academic'}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header glass">
          <div className="header-search">
            <input type="text" placeholder="Search across resources..." className="glass" />
          </div>
          <div className="header-actions">
            <div className="status-indicator">
              <div className="status-dot online" />
              <span>System Online</span>
            </div>
            <button className="notification-btn glass">
              <span className="notification-badge" />
              {/* Add bell icon if needed */}
            </button>
          </div>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at top right, var(--accent-glow), transparent),
                      radial-gradient(circle at bottom left, var(--accent-glow), transparent);
        }

        .dashboard-sidebar {
          width: 280px;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border-right: 1px solid var(--border-color);
          z-index: 10;
        }

        .sidebar-header {
          margin-bottom: 32px;
          position: relative;
        }

        .logo-text {
          font-size: 1.5rem;
          letter-spacing: -1px;
          color: var(--text-primary);
        }

        .logo-text span {
          color: var(--accent-primary);
        }

        .logo-glow {
          position: absolute;
          width: 40px;
          height: 40px;
          background: var(--accent-primary);
          filter: blur(40px);
          opacity: 0.5;
          top: -10px;
          left: -10px;
        }

        .new-session-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 600;
          margin-bottom: 32px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-tertiary);
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-secondary);
          position: relative;
        }

        .sidebar-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
        }

        .sidebar-item.active {
          color: var(--text-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .active-pill {
          position: absolute;
          left: 0;
          width: 4px;
          height: 20px;
          background: var(--accent-primary);
          border-radius: 0 4px 4px 0;
        }

        .student-placeholder {
          padding: 20px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .student-placeholder p {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: var(--bg-tertiary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .logout-btn {
          color: var(--text-tertiary);
        }

        .logout-btn:hover {
          color: #ef4444;
        }

        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .dashboard-header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .header-search input {
          width: 320px;
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          color: white;
          outline: none;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.online {
          background: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .content-area {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }
      `}} />
    </div>
  );
}
