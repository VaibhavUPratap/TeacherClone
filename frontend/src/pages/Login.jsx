import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: wire up to backend auth
  };

  return (
    <div className="login-root">
      {/* ── Card ── */}
      <main className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to continue to TeacherClone</p>

        <form className="login-form" onSubmit={handleSignIn} noValidate>
          {/* Email */}
          <div className="login-field">
            <label htmlFor="email-input" className="login-label">
              EMAIL ADDRESS
            </label>
            <input
              id="email-input"
              type="email"
              className="login-input"
              placeholder="educator@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <div className="login-password-header">
              <label htmlFor="password-input" className="login-label">
                PASSWORD
              </label>
              <a href="#forgot" className="login-forgot">
                Forgot?
              </a>
            </div>
            <input
              id="password-input"
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Sign In */}
          <button id="sign-in-btn" type="submit" className="login-btn-primary">
            Sign In &nbsp;→
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">OR</span>
          <span className="login-divider-line" />
        </div>

        {/* Google */}
        <button id="google-btn" type="button" className="login-btn-google">
          <GoogleIcon />
          Continue with Google
        </button>
      </main>

      {/* ── Footer ── */}
      <footer className="login-footer">
        <span>© 2024 TeacherClone. Built for the focused educator.</span>
        <nav className="login-footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#support">Support</a>
        </nav>
      </footer>
    </div>
  );
}

/* Inline Google "G" icon */
function GoogleIcon() {
  return (
    <svg
      className="google-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="20"
      height="20"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.42 3.05 29.48 1 24 1 14.82 1 7.07 6.76 3.89 14.9l7.08 5.5C12.66 14.62 17.89 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.55c0-1.64-.15-3.22-.42-4.75H24v9h12.43c-.54 2.9-2.17 5.36-4.63 7.02l7.12 5.53C43.18 37.36 46.1 31.37 46.1 24.55z"
      />
      <path
        fill="#FBBC05"
        d="M10.97 28.4A14.77 14.77 0 0 1 9.5 24c0-1.52.26-3 .72-4.39L3.14 14.1A23.94 23.94 0 0 0 0 24c0 3.84.92 7.46 2.54 10.67l8.43-6.27z"
      />
      <path
        fill="#34A853"
        d="M24 47c5.48 0 10.08-1.82 13.44-4.94l-7.12-5.53C28.5 38.3 26.34 39 24 39c-6.1 0-11.28-4.11-13.13-9.6l-7.12 5.54C7.07 42.28 14.82 47 24 47z"
      />
    </svg>
  );
}

export default Login;
