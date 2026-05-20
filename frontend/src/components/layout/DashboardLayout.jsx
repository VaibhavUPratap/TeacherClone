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
  User,
  Bell,
  Search,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────
   Sidebar item — N9 edge-aligned minimal
   Warm amber active pill + bloom bg
────────────────────────────────────────── */
const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path} tabIndex={0} aria-current={active ? 'page' : undefined}>
    <motion.div
      className={`sidebar-item ${active ? 'active' : ''}`}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="active-pill"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
    </motion.div>
  </Link>
);

export default function DashboardLayout() {
  const location  = useLocation();
  const current   = location.pathname;
  const { user, role, supabase } = useAuth();
  const navigate  = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const displayName = user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'User';

  return (
    <div className="dashboard-container">
      {/* ── Sidebar ── */}
      <aside className="dashboard-sidebar">
        {/* Wordmark */}
        <div className="sidebar-header" style={{ position: 'relative' }}>
          <div className="logo-glow" />
          <h1 className="logo-text">
            TEACHER<span>CLONE</span>
          </h1>
        </div>

        {/* New Resource CTA — teacher only */}
        {role === 'teacher' && (
          <button className="new-session-btn" id="new-resource-btn">
            <PlusCircle size={16} strokeWidth={2.2} />
            <span>New Resource</span>
          </button>
        )}

        {/* Primary nav */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          <p className="nav-label">
            {role === 'teacher' ? 'Faculty' : 'Student'}
          </p>

          {role === 'teacher' ? (
            <>
              <SidebarItem icon={LayoutDashboard} label="Class Materials" path="/dashboard"              active={current === '/dashboard'} />
              <SidebarItem icon={BarChart3}       label="Analytics"        path="/dashboard/data"         active={current === '/dashboard/data'} />
              <SidebarItem icon={FileText}         label="Slides"           path="/dashboard/slides"       active={current === '/dashboard/slides'} />
              <SidebarItem icon={Video}            label="Lectures"         path="/dashboard/lectures"     active={current === '/dashboard/lectures'} />
              <SidebarItem icon={MessageSquare}    label="Student Chats"    path="/dashboard/conversations" active={current === '/dashboard/conversations'} />
              <SidebarItem icon={Archive}          label="Archive"          path="/dashboard/archive"      active={current === '/dashboard/archive'} />
            </>
          ) : (
            <>
              <SidebarItem icon={LayoutDashboard} label="Home"          path="/dashboard"               active={current === '/dashboard'} />
              <SidebarItem icon={Library}          label="Subjects"      path="/dashboard/subjects"      active={current === '/dashboard/subjects'} />
              <SidebarItem icon={MessageSquare}    label="Ask Teacher"   path="/dashboard/interaction"  active={current === '/dashboard/interaction'} />
              <SidebarItem icon={BarChart3}        label="My Progress"   path="/dashboard/analytics"    active={current === '/dashboard/analytics'} />
              <SidebarItem icon={Archive}          label="History"       path="/dashboard/conversations" active={current === '/dashboard/conversations'} />
            </>
          )}
        </nav>

        {/* Footer: support + settings + user profile */}
        <div className="sidebar-footer">
          <nav className="sidebar-nav" aria-label="Secondary navigation">
            <SidebarItem icon={HelpCircle} label="Support"  path="/support"  active={current === '/support'} />
            <SidebarItem icon={Settings}   label="Settings" path="/settings" active={current === '/settings'} />
          </nav>

          <div className="user-profile">
            <div className="user-avatar">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={displayName}
                  style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
              ) : (
                <User size={16} strokeWidth={1.8} />
              )}
            </div>
            <div className="user-info">
              <p className="user-name">{displayName}</p>
              <p className="user-role">{role || 'Academic'}</p>
            </div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content stage ── */}
      <main className="dashboard-main">
        {/* Top header bar */}
        <header className="dashboard-header">
          <div className="header-search">
            <input
              id="global-search"
              type="search"
              placeholder="Search resources, conversations…"
              aria-label="Search"
            />
          </div>

          <div className="header-actions">
            <div className="status-indicator" aria-label="System status: online">
              <div className="status-dot online" />
              <span>Online</span>
            </div>
            <button className="notification-btn" aria-label="Notifications" id="notifications-btn">
              <Bell size={16} strokeWidth={1.8} />
              <span className="notification-badge" />
            </button>
          </div>
        </header>

        {/* Page outlet */}
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
