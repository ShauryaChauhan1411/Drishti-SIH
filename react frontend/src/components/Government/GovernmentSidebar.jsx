import {
  Activity,
  Camera,
  ClipboardCheck,
  Map,
  ShieldCheck,
  Users,
  Video,
  LogOut,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./GovernmentSidebar.css";

function GovernmentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="gov-sidebar">

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          <ShieldCheck size={22} />
        </div>

        <div>
          <strong>Smart Monitoring</strong>
          <span>DoSJE Command Centre</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">
          MONITORING
        </p>

        {/* OVERVIEW */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard")
          }
        >
          <Activity size={18} />
          Overview
        </button>

        {/* CCTV */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard/cctv"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard/cctv")
          }
        >
          <Camera size={18} />
          Live CCTV
        </button>

        {/* RANDOM VC */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard/random-vc"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard/random-vc")
          }
        >
          <Video size={18} />
          Random VC
        </button>

        {/* INSPECTIONS */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard/inspections"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard/inspections")
          }
        >
          <ClipboardCheck size={18} />
          Inspections
        </button>

        <p className="nav-title">
          ANALYTICS
        </p>

        {/* GEOGRAPHIC */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard/geographic"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard/geographic")
          }
        >
          <Map size={18} />
          Geographic Monitoring
        </button>

        {/* BENEFICIARY */}

        <button
          className={`nav-item ${
            location.pathname === "/government/dashboard/beneficiary"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/government/dashboard/beneficiary")
          }
        >
          <Users size={18} />
          Beneficiary Analytics
        </button>

      </nav>

      {/* LOGOUT */}

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut size={17} />
        Sign out
      </button>

    </aside>
  );
}

export default GovernmentSidebar;