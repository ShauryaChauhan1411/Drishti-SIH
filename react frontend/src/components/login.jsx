import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Shield, Building2, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== "chauhanshaurya1411@gmail.com") {
      setError("Unauthorized access. Access is restricted to authorized government personnel.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/government/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header Bar */}
      <header style={{ padding: "1.25rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ backgroundColor: "#2563eb", padding: "0.6rem", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
            <Shield size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>Smart Monitoring</h1>
            <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: "600" }}>DoSJE MONITORING & INSPECTION PLATFORM</p>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "1rem 2.5rem 3rem", alignItems: "center", gap: "3rem" }}>
        
        {/* Left Branding */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#eff6ff", color: "#2563eb", padding: "0.35rem 0.85rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            <Building2 size={14} />
            GOVERNMENT AUTHORITY
          </div>

          <h2 style={{ fontSize: "3.5rem", fontWeight: "900", lineHeight: "1.08", color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 1rem 0" }}>
            National<br />
            Monitoring<br />
            <span style={{ color: "#2563eb" }}>Command Centre</span>
          </h2>

          <p style={{ fontSize: "1rem", color: "#64748b", lineHeight: "1.6", maxWidth: "520px", marginBottom: "2rem" }}>
            Secure access for authorised Department officials to monitor projects, inspections, surveillance, compliance and field operations across the DoSJE monitoring network.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#334155", fontSize: "0.88rem", fontWeight: "600" }}>
              <CheckCircle2 size={18} style={{ color: "#10b981" }} />
              Role-based secure access
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#334155", fontSize: "0.88rem", fontWeight: "600" }}>
              <Shield size={18} style={{ color: "#10b981" }} />
              Protected government infrastructure
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#334155", fontSize: "0.88rem", fontWeight: "600" }}>
              <Building2 size={18} style={{ color: "#10b981" }} />
              Centralised monitoring environment
            </div>
          </div>
        </div>

        {/* Right Login Card */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "460px", boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.04)", border: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.75rem" }}>
              <div style={{ backgroundColor: "#eff6ff", color: "#2563eb", padding: "0.65rem", borderRadius: "12px" }}>
                <Building2 size={24} />
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#2563eb", fontWeight: "800", letterSpacing: "0.08em", textTransform: "uppercase" }}>OFFICIAL PORTAL</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Government Sign In</h3>
              </div>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fee2e2", color: "#dc2626", padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.82rem", marginBottom: "1.25rem", lineHeight: "1.4" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.4rem" }}>Official Email / User ID</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Mail size={18} style={{ position: "absolute", left: "1rem", color: "#94a3b8" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your official email"
                    required
                    style={{ width: "100%", padding: "0.75rem 1rem 0.75rem 2.6rem", borderRadius: "10px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.4rem" }}>Password</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Lock size={18} style={{ position: "absolute", left: "1rem", color: "#94a3b8" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{ width: "100%", padding: "0.75rem 2.6rem 0.75rem 2.6rem", borderRadius: "10px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "1rem", background: "none", border: "none", padding: 0, cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#475569", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ borderRadius: "4px" }}
                  />
                  Remember this device
                </label>
                <span style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: "600", cursor: "pointer" }}>Forgot password?</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "0.85rem", borderRadius: "10px", backgroundColor: "#1d4ed8", color: "#ffffff", border: "none", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "background-color 0.2s" }}
              >
                {loading ? "Authenticating..." : "Enter Command Centre"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <div style={{ marginTop: "1.5rem", backgroundColor: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Shield size={18} style={{ color: "#2563eb", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1e3a8a" }}>Authorised Access Only</div>
                  <div style={{ fontSize: "0.7rem", color: "#3b82f6" }}>This portal is restricted to authorised government personnel.</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}