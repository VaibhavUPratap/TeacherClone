import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glow-bg" />
      
      <motion.main 
        className="login-card glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="logo-icon glass">
            <LogIn className="logo-svg" size={24} />
          </div>
          <h1>Welcome Back</h1>
          <p>Access your academic engine dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSignIn}>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-error">{error}</motion.p>}
          
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper glass">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="educator@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Password</label>
              <a href="#" className="forgot-link">Forgot?</a>
            </div>
            <div className="input-wrapper glass">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="login-submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>

        <div className="login-divider">
          <span>Or continue with</span>
        </div>

        <div className="social-login">
          <motion.button 
            className="social-btn glass"
            onClick={handleGoogleSignIn}
            whileHover={{ y: -2 }}
          >
            <GoogleIcon />
            Google
          </motion.button>
          <motion.button 
            className="social-btn glass"
            whileHover={{ y: -2 }}
          >
            <GithubIcon size={20} />
            GitHub
          </motion.button>
        </div>
      </motion.main>

      <footer className="login-footer">
        <p>© 2024 TeacherClone. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>
        </div>
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
          background: #0a0a0c;
        }

        .login-glow-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
          filter: blur(100px);
          opacity: 0.15;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 48px;
          z-index: 10;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
        }

        .login-header h1 {
          font-size: 1.75rem;
          margin-bottom: 8px;
        }

        .login-header p {
          color: var(--text-secondary);
          font-size: 0.9375rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-link {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 12px;
          gap: 12px;
          transition: var(--transition-fast);
        }

        .input-wrapper:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px var(--accent-glow);
        }

        .input-wrapper input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 0.9375rem;
        }

        .input-icon {
          color: var(--text-tertiary);
        }

        .login-submit-btn {
          background: var(--accent-primary);
          color: white;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          margin-top: 8px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .login-error {
          color: #ef4444;
          font-size: 0.8125rem;
          background: rgba(239, 68, 68, 0.1);
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }

        .login-divider {
          text-align: center;
          position: relative;
          margin: 32px 0;
        }

        .login-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--border-color);
        }

        .login-divider span {
          background: #141418;
          padding: 0 16px;
          color: var(--text-tertiary);
          font-size: 0.8125rem;
          position: relative;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .login-footer {
          position: absolute;
          bottom: 32px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--text-tertiary);
          font-size: 0.8125rem;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }
      `}} />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.42 3.05 29.48 1 24 1 14.82 1 7.07 6.76 3.89 14.9l7.08 5.5C12.66 14.62 17.89 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.75H24v9h12.43c-.54 2.9-2.17 5.36-4.63 7.02l7.12 5.53C43.18 37.36 46.1 31.37 46.1 24.55z" />
      <path fill="#FBBC05" d="M10.97 28.4A14.77 14.77 0 0 1 9.5 24c0-1.52.26-3 .72-4.39L3.14 14.1A23.94 23.94 0 0 0 0 24c0 3.84.92 7.46 2.54 10.67l8.43-6.27z" />
      <path fill="#34A853" d="M24 47c5.48 0 10.08-1.82 13.44-4.94l-7.12-5.53C28.5 38.3 26.34 39 24 39c-6.1 0-11.28-4.11-13.13-9.6l-7.12 5.54C7.07 42.28 14.82 47 24 47z" />
    </svg>
  );
}

function GithubIcon({ size = 20 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default Login;
