
import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectService";
import { getPMUTeams } from "../../services/pmuService";
import { getDispatches } from "../../services/dispatchService";
import ProjectMap from "../../components/Government/ProjectMap";
import {
  Activity,
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Map,
  Brain,
  AlertTriangle,
  Users,
  ShieldCheck,
  RefreshCw,
  Video,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./GovernmentDashboard.css";

function GovernmentDashboard() {
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [pmuTeams, setPmuTeams] = useState([]);
  const [dispatches, setDispatches] = useState([]);
  useEffect(() => {
  getProjects().then((data) => {
    setFirebaseProjects(data);
    console.log("Projects from Firebase:", data);
    console.log("Number of projects:", data.length);
  });

  getPMUTeams().then((data) => {
    setPmuTeams(data);
    console.log("PMU Teams from Firebase:", data);
    console.log("Number of PMU teams:", data.length);
  });

  getDispatches().then((data) => {
  setDispatches(data);
  console.log("Dispatches from Firebase:", data);
  console.log("Number of dispatches:", data.length);
});
}, []);
  const navigate = useNavigate();

  // =========================================
  // DEMO MONITORING DATA
  // Later this will come from backend/API
  // =========================================

  const projects = firebaseProjects
  .filter(
    (project) =>
      project.risk_category === "High" ||
      project.risk_category === "Critical"
  )
  .sort((a, b) => b.risk_score - a.risk_score)
  .slice(0, 5);
  const monitoringActivities = [
    {
      title: "AI risk detected",
      description: "Project Udaan marked as high risk",
      time: "2 min ago",
      type: "risk",
    },
    {
      title: "CCTV connection restored",
      description: "Camera feed at Saksham Institute is online",
      time: "8 min ago",
      type: "success",
    },
    {
      title: "Inspection completed",
      description: "Inspection report submitted by PMU Team 07",
      time: "15 min ago",
      type: "inspection",
    },
    {
      title: "Attendance anomaly",
      description: "Unusual attendance pattern detected",
      time: "24 min ago",
      type: "warning",
    },
  ];

  return (
    <div className="gov-dashboard">

      <main className="gov-main">

        <section className="dashboard-content">

          {/* =========================================
              WELCOME SECTION
          ========================================= */}

          <div className="welcome-section">

            <div className="welcome-left">

              <button
                className="dashboard-back-button"
                onClick={() => navigate("/")}
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>

              <div>

                <span className="dashboard-tag">
                  REAL-TIME MONITORING
                </span>

                <h2>
                  National Monitoring Overview
                </h2>

                <p>
                  Centralised visibility of projects, inspections,
                  surveillance and compliance activities.
                </p>

              </div>

            </div>

            <div className="date-card">

              <span>
                MONITORING STATUS
              </span>

              <strong>
                ● LIVE
              </strong>

            </div>

          </div>


          {/* =========================================
              STATISTICS
          ========================================= */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">
                <Map size={20} />
              </div>

              <div>
                <span>Total Projects</span>
                <strong>{firebaseProjects.length}</strong>
                <small>
                  Across monitored locations
                </small>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <ClipboardCheck size={20} />
              </div>

              <div>
                <span>Active Inspections</span>
                <strong>{pmuTeams.reduce((total, team) => total + team.active_audits, 0)}</strong>
                <small>
                  Currently assigned
                </small>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Camera size={20} />
              </div>

              <div>
                <span>Live CCTV</span>
                <strong>186</strong>
                <small>
                  Connected feeds
                </small>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Activity size={20} />
              </div>

              <div>
                <span>Monitoring Alerts</span>
                <strong>
  {firebaseProjects.filter(
    (project) => project.flagged_for_audit === 1
  ).length}
</strong>
                <small>
                  Require attention
                </small>
              </div>

            </div>

          </div>


          {/* =========================================
              AI MONITORING SECTION
          ========================================= */}

          <div className="ai-section">

            <div className="ai-section-heading">

              <div>

                <span className="section-label">
                  AI-POWERED MONITORING
                </span>

                <h3>
                  Risk & Inspection Intelligence
                </h3>

                <p>
                  AI analyses attendance, inspection history,
                  compliance and monitoring signals to identify
                  projects requiring attention.
                </p>

              </div>

              <div className="ai-status">
                <Brain size={17} />
                AI ACTIVE
              </div>

            </div>


            {/* AI SUMMARY */}

            <div className="ai-summary-grid">

              <div className="ai-summary-card">

                <div className="ai-summary-icon high">
                  <AlertTriangle size={18} />
                </div>

                <div>
                  <span>High Risk Projects</span>
                  <strong>{firebaseProjects.filter(
  (project) =>
    project.risk_category === "High" ||
    project.risk_category === "Critical"
).length}</strong>
                  <small>
                    Require priority inspection
                  </small>
                </div>

              </div>


              <div className="ai-summary-card">

                <div className="ai-summary-icon">
                  <Brain size={18} />
                </div>

                <div>
                  <span>AI Anomalies</span>
                  <strong>14</strong>
                  <small>
                    Detected today
                  </small>
                </div>

              </div>


              <div className="ai-summary-card">

                <div className="ai-summary-icon">
                  <ClipboardCheck size={18} />
                </div>

                <div>
                  <span>AI Assignments</span>
                 <strong>{dispatches.length}</strong>
                  <small>
                    Generated this week
                  </small>
                </div>

              </div>


              <div className="ai-summary-card">

                <div className="ai-summary-icon success">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <span>Normal Projects</span>
                  <strong>{firebaseProjects.filter(
  (project) =>
    project.risk_category === "Low" ||
    project.risk_category === "Medium"
).length}</strong>
                  <small>
                    No critical signals
                  </small>
                </div>

              </div>

            </div>


            {/* AI RISK TABLE */}

            <div className="ai-risk-card">

              <div className="card-heading">

                <div>
                  <span>
                    AI RISK ANALYSIS
                  </span>

                  <h3>
                    Projects Requiring Attention
                  </h3>
                </div>

                <Brain size={20} />

              </div>


              <div className="risk-project-list">

                {projects.map((project) => (

                  <div
                    className="risk-project"
                    key={project.id}
                  >

                    <div className="risk-project-info">

                      <strong>
                        {project.project_id}
                      </strong>

                      <span>
                        <Map size={12} />
                        {project.district}
                      </span>

                      <small>
                       Risk Score: {project.risk_score}
                      </small>

                    </div>


                    <div className="risk-score-box">

                      <div
                        className={`risk-circle ${project.risk_category.toLowerCase()}`}
                      >
                        {Math.round(project.risk_score * 100)}
                      </div>

                      <span>
                       {project.risk_category} RISK
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* AI ASSIGNMENT BUTTON */}

            <div className="ai-assignment-panel">

              <div className="ai-assignment-info">

                <div className="ai-assignment-icon">
                  <RefreshCw size={20} />
                </div>

                <div>

                  <strong>
                    AI-Based Inspection Assignment
                  </strong>

                  <span>
                    Automatically prioritize eligible projects
                    and generate randomized inspection assignments.
                  </span>

                </div>

              </div>


              <button
                className="ai-assignment-button"
                onClick={() =>
                  navigate("/government/dashboard/ai-assignment")
                }
              >
                <Brain size={16} />
                Open AI Inspection Engine
              </button>

            </div>

          </div>


          {/* =========================================
              CCTV + ATTENDANCE MONITORING
          ========================================= */}

          <div className="quick-monitor-grid">

            {/* CCTV */}

            <div className="monitor-card quick-status-card">

              <div className="card-heading">

                <div>
                  <span>
                    CCTV SURVEILLANCE
                  </span>

                  <h3>
                    Live Camera Health
                  </h3>
                </div>

                <Video size={20} />

              </div>


              <div className="health-row">

                <div>
                  <strong className="health-number">
                    186
                  </strong>

                  <span>
                    Cameras Online
                  </span>
                </div>

                <div className="health-status success-status">
                  <CheckCircle2 size={15} />
                  ONLINE
                </div>

              </div>


              <div className="health-progress">

                <div
                  className="health-progress-fill"
                  style={{ width: "91%" }}
                ></div>

              </div>


              <div className="health-footer">

                <span>
                  18 Cameras Offline
                </span>

                <button
                  onClick={() =>
                    navigate("/government/dashboard/cctv")
                  }
                >
                  View CCTV
                </button>

              </div>

            </div>


            {/* ATTENDANCE */}

            <div className="monitor-card quick-status-card">

              <div className="card-heading">

                <div>
                  <span>
                    AI ATTENDANCE ANALYTICS
                  </span>

                  <h3>
                    Attendance Monitoring
                  </h3>
                </div>

                <Users size={20} />

              </div>


              <div className="attendance-score">

                <div>

                  <strong>
                    86%
                  </strong>

                  <span>
                    Overall consistency
                  </span>

                </div>

                <div className="attendance-alert">
                  <AlertTriangle size={15} />
                  14 anomalies
                </div>

              </div>


              <div className="attendance-info">

                <div>
                  <span>Reported</span>
                  <strong>12,480</strong>
                </div>

                <div>
                  <span>Observed</span>
                  <strong>10,921</strong>
                </div>

                <div>
                  <span>Variance</span>
                  <strong>12.5%</strong>
                </div>

              </div>


              <div className="health-footer">

                <span>
                  AI anomaly detection active
                </span>

                <button
                  onClick={() =>
                    navigate("/government/dashboard/beneficiary")
                  }
                >
                  View Analytics
                </button>

              </div>

            </div>

          </div>


          {/* =========================================
              MAIN MONITORING AREA
          ========================================= */}

          <div className="monitor-grid">

            {/* MAP CARD */}

            <div className="monitor-card map-card">

              <div className="card-heading">

                <div>
                  <span>
                    GEOGRAPHIC MONITORING
                  </span>

                  <h3>
                    Project Distribution
                  </h3>
                </div>

                <Map size={20} />

              </div>


              <div className="dashboard-project-map">
  <ProjectMap />
</div>
            </div>


            {/* ALERT CARD */}

            <div className="monitor-card alert-card">

              <div className="card-heading">

                <div>

                  <span>
                    ATTENTION REQUIRED
                  </span>

                  <h3>
                    Monitoring Alerts
                  </h3>

                </div>

                <Bell size={20} />

              </div>


              <div className="alert-list">

                <div className="alert-item">

                  <div className="alert-dot"></div>

                  <div>
                    <strong>
                      Inspection pending
                    </strong>

                    <span>
                      3 inspections require verification
                    </span>
                  </div>

                </div>


                <div className="alert-item">

                  <div className="alert-dot"></div>

                  <div>
                    <strong>
                      CCTV connection issue
                    </strong>

                    <span>
                      2 project feeds unavailable
                    </span>
                  </div>

                </div>


                <div className="alert-item">

                  <div className="alert-dot"></div>

                  <div>
                    <strong>
                      Attendance anomaly
                    </strong>

                    <span>
                      Detected by monitoring analytics
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================================
              RECENT MONITORING ACTIVITY
          ========================================= */}

          <div className="activity-card monitor-card">

            <div className="card-heading">

              <div>

                <span>
                  REAL-TIME ACTIVITY
                </span>

                <h3>
                  Recent Monitoring Events
                </h3>

              </div>

              <Activity size={20} />

            </div>


            <div className="activity-list">

              {monitoringActivities.map((activity, index) => (

                <div
                  className="activity-item"
                  key={index}
                >

                  <div className={`activity-icon ${activity.type}`}>

                    {activity.type === "risk" && (
                      <AlertTriangle size={15} />
                    )}

                    {activity.type === "success" && (
                      <CheckCircle2 size={15} />
                    )}

                    {activity.type === "inspection" && (
                      <ClipboardCheck size={15} />
                    )}

                    {activity.type === "warning" && (
                      <Users size={15} />
                    )}

                  </div>


                  <div className="activity-details">

                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {activity.description}
                    </span>

                  </div>


                  <time>
                    {activity.time}
                  </time>

                </div>

              ))}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default GovernmentDashboard;