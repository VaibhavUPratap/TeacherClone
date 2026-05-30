import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck, GraduationCap, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useAuth();

  const [role, setRole] = useState(null); // 'teacher' or 'student'
  const [step, setStep] = useState(1); // 1: role selection, 2: login form

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Store role in local storage and context
      localStorage.setItem('userRole', role);
      setGlobalRole(role);
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      // In a real app, you'd handle role assignment post-OAuth
      localStorage.setItem('userRole', role);
      setGlobalRole(role);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Dynamic Background Elements */}
      <div className="bg-gradient" />
      <div className="blob-1" />
      <div className="blob-2" />
      <div className="blob-3" />
      
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.main 
            key="role-step"
            className="login-card glass-container role-selection-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="login-header">
              <motion.h1>Who are <span>you</span>?</motion.h1>
              <p>Select your academic identity to begin.</p>
            </div>

            <div className="role-options">
              <motion.div 
                className="role-card glass"
                whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect('teacher')}
              >
                <div className="role-icon-wrapper teacher">
                  <Users size={32} />
                </div>
                <h3>Teacher</h3>
                <p>I want to manage classes and resources.</p>
              </motion.div>

              <motion.div 
                className="role-card glass"
                whileHover={{ scale: 1.05, borderColor: '#10b981' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect('student')}
              >
                <div className="role-icon-wrapper student">
                  <GraduationCap size={32} />
                </div>
                <h3>Student</h3>
                <p>I want to learn and ask questions.</p>
              </motion.div>
            </div>
          </motion.main>
        ) : (
          <motion.main 
            key="login-step"
            className="login-card glass-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <button className="back-link" onClick={() => setStep(1)}>← Back to role selection</button>
            <div className="login-header">
              <div className="role-indicator">
                {role === 'teacher' ? 'TEACHER MODE' : 'STUDENT MODE'}
              </div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                TEACHER<span>CLONE</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sign in to your {role} account.
              </motion.p>
            </div>

            <form className="login-form" onSubmit={handleSignIn}>
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="login-error-box"
                  >
                    <ShieldCheck size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="input-group">
                <label>Educational Email</label>
                <div className="input-wrapper glass">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    placeholder="email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>
                  <a href="#" className="text-link">Recovery?</a>
                </div>
                <div className="input-wrapper glass">
                  <Lock size={18} className="field-icon" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <motion.button 
                type="submit" 
                className="primary-btn"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <span>Enter Academic Engine</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
              
              <div className="login-divider">
                <span className="line" />
                <span className="text">OR SYNCHRONIZE WITH</span>
                <span className="line" />
              </div>

              <motion.button 
                type="button" 
                className="google-auth-btn glass"
                onClick={handleGoogleSignIn}
                whileHover={{ scale: 1.02, background: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="22" />
                <span>Google Identity</span>
              </motion.button>
            </form>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="global-footer">
        <p>© 2024 TeacherClone Systems. Secure Academic Environment.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #050507;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050507 100%);
          z-index: 0;
        }

        .blob-1, .blob-2, .blob-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          z-index: 1;
        }

        .blob-1 {
          width: 400px;
          height: 400px;
          background: #6366f1;
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          width: 300px;
          height: 300px;
          background: #8b5cf6;
          bottom: -50px;
          left: -50px;
        }

        .blob-3 {
          width: 250px;
          height: 250px;
          background: #3b82f6;
          top: 40%;
          left: 10%;
        }

        .glass-container {
          background: rgba(18, 18, 23, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 48px;
          border-radius: 32px;
          z-index: 10;
          position: relative;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-header h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .login-header h1 span {
          color: #6366f1;
        }

        .login-header p {
          color: #a1a1aa;
          font-size: 0.9375rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .login-error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.8125rem;
          margin-bottom: 8px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #71717a;
          margin-left: 4px;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-link {
          font-size: 0.75rem;
          color: #6366f1;
          font-weight: 500;
          transition: color 0.2s;
        }

        .text-link:hover {
          color: #818cf8;
          text-decoration: underline;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          padding: 14px 18px;
          border-radius: 16px;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s;
        }

        .input-wrapper:focus-within {
          border-color: #6366f1;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .input-wrapper input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 0.9375rem;
        }

        .field-icon {
          color: #52525b;
        }

        .primary-btn {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 16px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 0.9375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 16px 0;
        }

        .login-divider .line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .login-divider .text {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #52525b;
          letter-spacing: 1px;
        }

        .google-auth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px;
          border-radius: 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .login-footer-mini {
          margin-top: 32px;
          text-align: center;
          font-size: 0.8125rem;
          color: #71717a;
        }

        .role-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }

        .role-card {
          padding: 24px 16px;
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.02);
        }

        .role-card h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .role-card p {
          font-size: 0.75rem;
          color: #71717a;
          line-height: 1.4;
        }

        .role-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .role-icon-wrapper.teacher {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }

        .role-icon-wrapper.student {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
        }

        .back-link {
          background: transparent;
          border: none;
          color: #71717a;
          font-size: 0.75rem;
          cursor: pointer;
          margin-bottom: 24px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #6366f1;
        }

        .role-indicator {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          border-radius: 20px;
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .global-footer {
          position: absolute;
          bottom: 24px;
          color: #52525b;
          font-size: 0.75rem;
          text-align: center;
          width: 100%;
        }
      `}} />
    </div>
  );
}

export default Login;
