import {
  Bell,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { Outlet, useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import GovernmentSidebar from "./GovernmentSidebar";

import "./GovernmentLayout.css";

function GovernmentLayout() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="government-layout">

      {/* =================================
          FIXED TOP NAVBAR
      ================================= */}

      <header className="government-topbar">

        <div className="government-topbar-brand">

          <div className="government-topbar-logo">
            <ShieldCheck size={22} />
          </div>

          <div className="government-brand-text">
            <strong>Smart Monitoring</strong>
            <span>DoSJE Command Centre</span>
          </div>

        </div>


        <div className="government-topbar-actions">

          {/* SYSTEM STATUS */}

          <div className="government-system-status">
            <span></span>
            SYSTEM LIVE
          </div>


          {/* NOTIFICATIONS */}

          <button
            className="government-topbar-button"
            aria-label="Notifications"
          >
            <Bell size={19} />

            <b>3</b>
          </button>


          {/* THEME */}

          <button
            className="government-topbar-button theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>


          {/* PROFILE */}

          <div className="government-profile">

            <div className="government-profile-avatar">
              GO
            </div>

            <div>
              <strong>Government Official</strong>
              <span>DoSJE</span>
            </div>

          </div>

        </div>

      </header>


      {/* =================================
          GLOBAL SIDEBAR
      ================================= */}

      <GovernmentSidebar />


      {/* =================================
          PAGE CONTENT
      ================================= */}

      <main className="government-layout-main">
        <Outlet />
      </main>

    </div>
  );
}

export default GovernmentLayout;