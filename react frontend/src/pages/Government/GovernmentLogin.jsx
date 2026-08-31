import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Landmark,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import "./GovernmentLogin.css";

function GovernmentLogin() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    navigate("/government/dashboard");
  };

  return (
    <main className="gov-login-page">

      <div className="gov-login-grid" />
      <div className="gov-login-glow gov-login-glow-one" />
      <div className="gov-login-glow gov-login-glow-two" />

      <header className="gov-login-header">

        <div className="gov-login-brand">

          <div className="gov-login-logo">
            <ShieldCheck size={23} />
          </div>

          <div>
            <strong>Smart Monitoring</strong>
            <span>DoSJE Monitoring & Inspection Platform</span>
          </div>

        </div>

        <button
          className="gov-login-theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>

      </header>

      <section className="gov-login-content">

        <div className="gov-login-introduction">

          <div className="gov-login-kicker">
            <Landmark size={15} />
            GOVERNMENT AUTHORITY
          </div>

          <h1>
            National Monitoring
            <span>Command Centre</span>
          </h1>

          <p>
            Secure access for authorised Department officials to monitor
            projects, inspections, surveillance, compliance and field
            operations across the DoSJE monitoring network.
          </p>

          <div className="gov-login-features">

            <div>
              <ShieldCheck size={17} />
              <span>Role-based secure access</span>
            </div>

            <div>
              <LockKeyhole size={17} />
              <span>Protected government infrastructure</span>
            </div>

            <div>
              <Landmark size={17} />
              <span>Centralised monitoring environment</span>
            </div>

          </div>

        </div>

        <div className="gov-login-card">

          <div className="gov-login-card-header">

            <div className="gov-login-card-icon">
              <Landmark size={22} />
            </div>

            <div>
              <span>OFFICIAL PORTAL</span>
              <h2>Government Sign In</h2>
            </div>

          </div>

          <div className="gov-login-divider" />

          <form onSubmit={handleLogin}>

            <label>
              Official Email / User ID
            </label>

            <div className="gov-input-wrapper">
              <Mail size={17} />

              <input
                type="email"
                placeholder="Enter your official email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label>
              Password
            </label>

            <div className="gov-input-wrapper">
              <LockKeyhole size={17} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>

            <div className="gov-login-options">

              <label className="remember-option">
                <input type="checkbox" />
                <span>Remember this device</span>
              </label>

              <button
  type="button"
  onClick={() =>
    alert("Please contact the authorised DoSJE administrator for password assistance.")
  }
>
  Forgot password?
</button>

            </div>

            <button
              type="submit"
              className="gov-login-submit"
            >
              <span>Enter Command Centre</span>
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="gov-login-security">

            <ShieldCheck size={16} />

            <div>
              <strong>Authorised Access Only</strong>
              <span>
                This portal is restricted to authorised government personnel.
              </span>
            </div>

          </div>

        </div>

      </section>

      <footer className="gov-login-footer">

        <span>
          Government Digital Infrastructure
        </span>

        <span>•</span>

        <span>
          DoSJE Monitoring & Inspection Platform
        </span>

        <span>•</span>

        <span>
          Secure Environment
        </span>

      </footer>

    </main>
  );
}

export default GovernmentLogin;