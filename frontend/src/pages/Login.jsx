import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, GraduationCap, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.45, 0, 0.55, 1] } },
};

function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();
  const { setRole: setGlobalRole } = useAuth();

  const [role, setRole] = useState(null);   // 'teacher' | 'student'
  const [step, setStep] = useState(1);      // 1: role pick  2: sign-in form

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Query database profiles table to get verified user role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      
      const verifiedRole = profile?.role || role || "student";
      
      localStorage.setItem("userRole", verifiedRole);
      setGlobalRole(verifiedRole);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          /* ── Step 1: Role pick ── */
          <motion.main
            key="role-step"
            className="login-card role-selection-card"
            {...fadeSlide}
          >
            <div className="login-header">
              <div className="login-wordmark">
                <span>WAYFARE · ACADEMIC</span>
              </div>
              <h1>Who are <span>you?</span></h1>
              <p>Choose your path to enter the system.</p>
            </div>

            <div className="role-options">
              <motion.div
                className="role-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRoleSelect("teacher")}
                role="button"
                tabIndex={0}
                id="role-teacher"
                onKeyDown={e => e.key === "Enter" && handleRoleSelect("teacher")}
              >
                <div className="role-icon-wrapper teacher">
                  <Users size={26} strokeWidth={1.8} />
                </div>
                <h3>Teacher</h3>
                <p>Manage classes, resources, and conversations.</p>
              </motion.div>

              <motion.div
                className="role-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRoleSelect("student")}
                role="button"
                tabIndex={0}
                id="role-student"
                onKeyDown={e => e.key === "Enter" && handleRoleSelect("student")}
              >
                <div className="role-icon-wrapper student">
                  <GraduationCap size={26} strokeWidth={1.8} />
                </div>
                <h3>Student</h3>
                <p>Learn, ask questions, track your progress.</p>
              </motion.div>

              <motion.div
                className="role-card"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRoleSelect("admin")}
                role="button"
                tabIndex={0}
                id="role-admin"
                onKeyDown={e => e.key === "Enter" && handleRoleSelect("admin")}
              >
                <div className="role-icon-wrapper admin">
                  <ShieldCheck size={26} strokeWidth={1.8} />
                </div>
                <h3>Admin</h3>
                <p>Upload student voices, teacher lectures, and configure settings.</p>
              </motion.div>
            </div>
          </motion.main>
        ) : (
          /* ── Step 2: Sign-in form ── */
          <motion.main
            key="login-step"
            className="login-card"
            {...fadeSlide}
          >
            <button
              className="back-link"
              onClick={() => { setStep(1); setError(""); }}
              aria-label="Back to role selection"
            >
              ← Back
            </button>

            <div className="login-header">
              <div className="role-indicator">
                {role === "teacher" ? "Faculty" : role === "admin" ? "Admin" : "Student"} · Sign in
              </div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                TEACHER<span>CLONE</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.35 }}
              >
                Your AI-powered {role === "teacher" ? "faculty" : role === "admin" ? "admin" : "learning"} environment.
              </motion.p>
            </div>

            <form className="login-form" onSubmit={handleSignIn} noValidate>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="login-error-box"
                  >
                    <ShieldCheck size={15} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="input-group">
                <label htmlFor="login-email">Email address</label>
                <div className="input-wrapper">
                  <Mail size={17} className="field-icon" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@institution.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label htmlFor="login-password">Password</label>
                  <a href="#" className="text-link">Forgot?</a>
                </div>
                <div className="input-wrapper">
                  <Lock size={17} className="field-icon" />
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                id="login-submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}
              >
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <span>Enter the system</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="global-footer">
        © 2026 TeacherClone Systems · Secure Academic Environment
      </footer>
    </div>
  );
}

export default Login;
