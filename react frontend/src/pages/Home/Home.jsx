import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  Landmark,
  LockKeyhole,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="home-page">

      <div className="background-grid"></div>
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      {/* HEADER */}
      <header className="home-header">

        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>

          <div>
            <h1>Smart Monitoring</h1>
            <p>DoSJE Monitoring & Inspection Platform</p>
          </div>
        </div>

        <div className="header-right">

          <div className="system-status">
            <span></span>
            SYSTEM ONLINE
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>

        </div>

      </header>

      {/* MAIN */}
      <main className="home-main">

        <section className="hero">

          <div className="hero-label">
            <Activity size={15} />
            GOVERNMENT DIGITAL MONITORING
          </div>

          <h2>
            National Monitoring
            <span>Command Centre</span>
          </h2>

          <p>
            A centralised monitoring platform for real-time project
            oversight, inspections, CCTV surveillance, compliance,
            field evidence and intelligent analytics under DoSJE schemes.
          </p>

          <div className="hero-actions">

            <button
              className="primary-action"
              onClick={() => navigate("/government/login")}
            >
              <LockKeyhole size={17} />
              Government Portal
              <ArrowRight size={17} />
            </button>

            <div className="secure-note">
              <ShieldCheck size={15} />
              Authorised government access
            </div>

          </div>

        </section>

        {/* GOVERNMENT PORTAL */}
        <section className="government-entry">

          <div className="entry-visual">

            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="visual-core">
              <Landmark size={48} strokeWidth={1.4} />
            </div>

            <div className="floating-stat stat-one">
              <span className="stat-dot"></span>
              Live Monitoring
            </div>

            <div className="floating-stat stat-two">
              <Activity size={14} />
              Real-time Data
            </div>

          </div>

          <div className="entry-content">

            <span className="entry-label">
              OFFICIAL GOVERNMENT PORTAL
            </span>

            <h3>
              Monitor the entire
              <strong> inspection ecosystem</strong>
            </h3>

            <p>
              Department officials can access a unified command centre
              for monitoring projects and institutions, reviewing
              inspections, surveillance status, alerts, compliance and
              field-generated evidence.
            </p>

            <div className="entry-features">

              <div>
                <ShieldCheck size={16} />
                <span>Centralised monitoring</span>
              </div>

              <div>
                <Activity size={16} />
                <span>Real-time operational visibility</span>
              </div>

              <div>
                <Landmark size={16} />
                <span>Department-level oversight</span>
              </div>

            </div>

            <button
              className="entry-button"
              onClick={() => navigate("/government/login")}
            >
              Enter Government Command Centre
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        {/* PLATFORM CAPABILITIES */}
        <section className="capabilities">

          <div className="capability">
            <div className="capability-icon">
              <Activity size={19} />
            </div>

            <div>
              <strong>Real-time Monitoring</strong>
              <span>
                Live visibility of monitored projects and institutions
              </span>
            </div>
          </div>

          <div className="capability">
            <div className="capability-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <strong>Inspection Governance</strong>
              <span>
                Track assignments, inspections and verification
              </span>
            </div>
          </div>

          <div className="capability">
            <div className="capability-icon">
              <Landmark size={19} />
            </div>

            <div>
              <strong>Centralised Oversight</strong>
              <span>
                Unified Department monitoring and decision support
              </span>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="home-footer">

        <span>
          Smart Monitoring & Inspection Platform
        </span>

        <span>•</span>

        <span>
          DoSJE Digital Monitoring Infrastructure
        </span>

        <span>•</span>

        <span>
          Secure Government Environment
        </span>

      </footer>

    </div>
  );
}

export default Home;