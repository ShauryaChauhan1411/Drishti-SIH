// AIAssignment.jsx

import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Users,
  ClipboardCheck,
  RefreshCw,
  Search,
  Filter,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import "./AIAssignment.css";

function AIAssignment() {
  const navigate = useNavigate();

  // =====================================================
  // DEMO DATA
  // Backend can replace this later with API data
  // =====================================================

  const initialProjects = [
    {
      id: 1,
      name: "Project Udaan",
      location: "Haryana",
      risk: 82,
      level: "HIGH",
      attendance: "Anomaly detected",
      compliance: "Inspection overdue",
      lastInspection: "42 days ago",
      eligible: true,
    },
    {
      id: 2,
      name: "Saksham Institute",
      location: "Delhi",
      risk: 64,
      level: "MEDIUM",
      attendance: "Minor variance",
      compliance: "Previous issue",
      lastInspection: "28 days ago",
      eligible: true,
    },
    {
      id: 3,
      name: "Nayi Disha Centre",
      location: "Punjab",
      risk: 28,
      level: "LOW",
      attendance: "Normal",
      compliance: "Compliant",
      lastInspection: "12 days ago",
      eligible: true,
    },
    {
      id: 4,
      name: "Shakti Training Centre",
      location: "Rajasthan",
      risk: 74,
      level: "HIGH",
      attendance: "Attendance mismatch",
      compliance: "Document verification pending",
      lastInspection: "36 days ago",
      eligible: true,
    },
    {
      id: 5,
      name: "Pragati Centre",
      location: "Uttar Pradesh",
      risk: 51,
      level: "MEDIUM",
      attendance: "Moderate variance",
      compliance: "Review required",
      lastInspection: "31 days ago",
      eligible: true,
    },
  ];

 const [teams, setTeams] = useState([]);
 useEffect(() => {
  const loadTeams = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/pmu-teams");

      if (!response.ok) {
        throw new Error("Failed to fetch PMU teams");
      }

      const data = await response.json();

      const formattedTeams = data.map((team) => ({
        id: team.id,
        name: team.team_name || team.name || team.team_id,
        region: team.region || team.zone || "Delhi",
        status:
          team.status ||
          (team.active_audits !== undefined && team.active_audits === 0
            ? "Available"
            : "Available"),
      }));

      setTeams(formattedTeams);

      console.log("AI Inspection teams from backend:", formattedTeams);
    } catch (error) {
      console.error("Failed to load AI Inspection teams:", error);
    }
  };

  loadTeams();
}, []);

  // =====================================================
  // STATE
  // =====================================================

  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [inspectionType, setInspectionType] = useState("Physical");
  const [assignment, setAssignment] = useState(null);
  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
  const loadProjects = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      const formattedProjects = data.map((project) => ({
        id: project.id,
        name:
  project.name ||
  project.project_name ||
  project.project_id ||
  "Unnamed Project",
       location:
  project.location ||
  project.district ||
  project.state ||
  "Delhi",
        risk: Number(project.risk_score || project.risk || 0),
        level:
          project.risk_category ||
          (Number(project.risk_score || project.risk || 0) >= 75
            ? "HIGH"
            : Number(project.risk_score || project.risk || 0) >= 50
            ? "MEDIUM"
            : "LOW"),
        attendance: project.attendance || "Attendance data available",
        compliance: project.compliance || "Compliance review required",
        lastInspection: project.last_inspection || "Not available",
        eligible: true,
      }));

      setProjects(formattedProjects);

      console.log("AI Inspection projects from backend:", formattedProjects);
    } catch (error) {
      console.error("Failed to load AI Inspection projects:", error);
    }
  };

  loadProjects();
}, []);

  // =====================================================
  // FILTER PROJECTS
  // =====================================================

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => project.eligible)
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.location.toLowerCase().includes(search.toLowerCase());

        const matchesRisk =
          riskFilter === "ALL" || project.level === riskFilter;

        return matchesSearch && matchesRisk;
      })
      .sort((a, b) => b.risk - a.risk);
  }, [projects, search, riskFilter]);

  // =====================================================
  // SELECT PROJECT
  // =====================================================

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setAssignment(null);
  };

  // =====================================================
  // AI ASSIGNMENT GENERATION
  // Backend-ready function
  // Later this function can call an API
  // =====================================================

  const generateInspectionAssignment = () => {
    if (!selectedProject) {
      alert("Please select a project first.");
      return;
    }

    setIsGenerating(true);
    console.log("Generate Assignment button clicked", selectedProject);

    fetch("http://localhost:5050/api/dispatch/generate", {
  method: "POST",
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error("Failed to generate inspection assignments");
    }

    return response.json();
  })
  .then((data) => {
    const generated = data.assignments || [];

    console.log("Dispatch API response:", data);
  console.log("Generated assignments:", generated);

  console.log("Selected project ID:", selectedProject.id);
console.log(
  "Backend project IDs:",
  generated.map((item) => item.project_id)
);
    const selectedAssignment = generated.find(
      (item) => item.project_id === selectedProject.id
    );
    console.log("Selected assignment:", selectedAssignment);
    console.log("Selected assignment details:", JSON.stringify(selectedAssignment, null, 2));

    if (!selectedAssignment) {
      alert("No assignment generated for the selected project.");
      return;
    }

    const priority =
      selectedProject.risk >= 75
        ? "URGENT"
        : selectedProject.risk >= 50
        ? "HIGH"
        : "NORMAL";

    const generatedAssignment = {
      id: Date.now(),
      projectId: selectedAssignment.project_id,
      project: selectedProject.name,
      location: selectedProject.location,
      risk: selectedProject.risk,
      level: selectedProject.level,
      reason: selectedAssignment.reason || "AI-based risk and availability matching",
      team:
  selectedAssignment.assigned_team_name ||
  selectedAssignment.assigned_team_id ||
  "Assigned PMU Team",
      inspectionType,
      priority,
      date: selectedAssignment.inspection_date
        ? new Date(selectedAssignment.inspection_date).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
        : new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      status: "ASSIGNED",
    };

    setAssignment(generatedAssignment);

    setAssignmentHistory((previous) => [
      generatedAssignment,
      ...previous,
    ]);
  })
  .catch((error) => {
    console.error("AI assignment generation failed:", error);
    alert("Failed to generate inspection assignment.");
  })
  .finally(() => {
    setIsGenerating(false);
  });
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetAssignment = () => {
    setSelectedProject(null);
    setSelectedTeam("");
    setInspectionType("Physical");
    setAssignment(null);
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="ai-assignment-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ai-assignment-header">

        <div className="ai-header-left">

          <button
            className="ai-back-button"
            onClick={() =>
              navigate("/government/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <span className="ai-page-label">
              AI-POWERED INSPECTION
            </span>

            <h1>
              AI Inspection Engine
            </h1>

            <p>
              Intelligent project prioritization and
              randomized inspection assignment.
            </p>
          </div>

        </div>

        <div className="ai-live-status">
          <Brain size={16} />
          AI ENGINE ACTIVE
        </div>

      </div>


      {/* =================================================
          AI SUMMARY
      ================================================= */}

      <div className="engine-summary">

        <div className="engine-summary-card">
          <div className="engine-summary-icon high">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>High Risk</span>
            <strong>
              {projects.filter(
                (p) => p.level === "HIGH"
              ).length}
            </strong>
          </div>
        </div>

        <div className="engine-summary-card">
          <div className="engine-summary-icon">
            <ClipboardCheck size={18} />
          </div>

          <div>
            <span>Eligible</span>
            <strong>
              {projects.filter((p) => p.eligible).length}
            </strong>
          </div>
        </div>

        <div className="engine-summary-card">
          <div className="engine-summary-icon">
            <Users size={18} />
          </div>

          <div>
            <span>Available Teams</span>
            <strong>
              {teams.length}
            </strong>
          </div>
        </div>

        <div className="engine-summary-card">
          <div className="engine-summary-icon success">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Generated</span>
            <strong>
              {assignmentHistory.length}
            </strong>
          </div>
        </div>

      </div>


      {/* =================================================
          MAIN ENGINE
      ================================================= */}

      <div className="engine-layout">

        {/* =================================================
            PROJECT SELECTION
        ================================================= */}

        <section className="engine-card project-selection">

          <div className="engine-card-heading">

            <div>
              <span>
                STEP 01
              </span>

              <h2>
                Select Eligible Project
              </h2>

              <p>
                AI-prioritized projects requiring
                inspection.
              </p>
            </div>

            <ShieldCheck size={21} />

          </div>


          {/* SEARCH + FILTER */}

          <div className="project-tools">

            <div className="search-box">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search project or location..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="filter-box">

              <Filter size={15} />

              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(e.target.value)
                }
              >
                <option value="ALL">
                  All Risk
                </option>

                <option value="HIGH">
                  High Risk
                </option>

                <option value="MEDIUM">
                  Medium Risk
                </option>

                <option value="LOW">
                  Low Risk
                </option>
              </select>

            </div>

          </div>


          {/* PROJECT LIST */}

          <div className="project-list">

            {filteredProjects.map((project) => (

              <button
                className={`project-option ${
                  selectedProject?.id === project.id
                    ? "selected"
                    : ""
                }`}
                key={project.id}
                onClick={() =>
                  handleProjectSelect(project)
                }
              >

                <div className="project-main">

                  <div className="project-title-row">

                    <strong>
                      {project.name}
                    </strong>

                    <span
                      className={`risk-badge ${project.level.toLowerCase()}`}
                    >
                      {project.level}
                    </span>

                  </div>


                  <div className="project-location">

                    <MapPin size={12} />

                    {project.location}

                  </div>


                  <div className="project-reasons">

                    <span>
                      {project.attendance}
                    </span>

                    <span>
                      {project.compliance}
                    </span>

                  </div>

                </div>


                <div className="project-risk">

                  <strong>
                    {project.risk}
                  </strong>

                  <span>
                    Risk Score
                  </span>

                </div>

              </button>

            ))}

            {filteredProjects.length === 0 && (

              <div className="empty-projects">
                No eligible projects found.
              </div>

            )}

          </div>

        </section>


        {/* =================================================
            ASSIGNMENT CONFIGURATION
        ================================================= */}

        <section className="engine-card assignment-config">

          <div className="engine-card-heading">

            <div>
              <span>
                STEP 02
              </span>

              <h2>
                Assignment Configuration
              </h2>

              <p>
                Configure inspection assignment.
              </p>
            </div>

            <RefreshCw size={21} />

          </div>


          {/* SELECTED PROJECT */}

          <div className="selected-project-box">

            <span>
              SELECTED PROJECT
            </span>

            {selectedProject ? (

              <div className="selected-project-content">

                <strong>
                  {selectedProject.name}
                </strong>

                <small>
                  <MapPin size={12} />
                  {selectedProject.location}
                </small>

                <div
                  className={`selected-risk ${selectedProject.level.toLowerCase()}`}
                >
                  Risk Score: {selectedProject.risk}
                </div>

              </div>

            ) : (

              <div className="not-selected">
                Select a project from the list
              </div>

            )}

          </div>


          {/* TEAM */}

          <label className="form-label">
            Inspection Team
          </label>

          <select
            className="assignment-select"
            value={selectedTeam}
            onChange={(e) =>
              setSelectedTeam(e.target.value)
            }
          >

            <option value="">
              AI Random Selection
            </option>

            {teams.map((team) => (

              <option
                value={team.id}
                key={team.id}
              >
                {team.name} — {team.region}
              </option>

            ))}

          </select>


          {/* INSPECTION TYPE */}

          <label className="form-label">
            Inspection Type
          </label>

          <div className="inspection-type-grid">

            {[
              "Physical",
              "Virtual",
              "Document Review",
            ].map((type) => (

              <button
                type="button"
                className={`inspection-type ${
                  inspectionType === type
                    ? "active"
                    : ""
                }`}
                key={type}
                onClick={() =>
                  setInspectionType(type)
                }
              >
                {type}
              </button>

            ))}

          </div>


          {/* AI LOGIC */}

          <div className="ai-logic-box">

            <Brain size={18} />

            <div>

              <strong>
                AI prioritization logic
              </strong>

              <p>
                Risk score, attendance anomalies,
                compliance history and inspection
                recency are considered for priority.
              </p>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="assignment-actions">

            <button
              className="generate-button"
              onClick={generateInspectionAssignment}
              disabled={
                !selectedProject || isGenerating
              }
            >

              <Brain size={17} />

              {isGenerating
                ? "Generating..."
                : "Generate AI Assignment"}

            </button>


            <button
              className="reset-button"
              onClick={resetAssignment}
            >
              Reset
            </button>

          </div>

        </section>

      </div>


      {/* =================================================
          GENERATED ASSIGNMENT
      ================================================= */}

      {assignment && (

        <section className="generated-assignment">

          <div className="generated-heading">

            <div>

              <span>
                STEP 03
              </span>

              <h2>
                Generated Inspection Assignment
              </h2>

            </div>

            <div className="assigned-status">
              <CheckCircle2 size={15} />
              ASSIGNED
            </div>

          </div>


          <div className="assignment-result-grid">

            <div className="result-project">

              <span>
                PROJECT
              </span>

              <strong>
                {assignment.project}
              </strong>

              <small>
                <MapPin size={12} />
                {assignment.location}
              </small>

            </div>


            <div className="result-item">

              <span>
                AI RISK SCORE
              </span>

              <strong>
                {assignment.risk}
              </strong>

              <small>
                {assignment.level} RISK
              </small>

            </div>


            <div className="result-item">

              <span>
                ASSIGNED TEAM
              </span>

              <strong>
                {assignment.team}
              </strong>

              <small>
                Randomized / Selected
              </small>

            </div>


            <div className="result-item">

              <span>
                INSPECTION TYPE
              </span>

              <strong>
                {assignment.inspectionType}
              </strong>

              <small>
                Field monitoring
              </small>

            </div>


            <div className="result-item">

              <span>
                PRIORITY
              </span>

              <strong className="priority-text">
                {assignment.priority}
              </strong>

              <small>
                AI determined
              </small>

            </div>


            <div className="result-item">

              <span>
                SUGGESTED DATE
              </span>

              <strong>
                {assignment.date}
              </strong>

              <small>
                <CalendarDays size={12} />
                Scheduled
              </small>

            </div>

          </div>


          <div className="assignment-reason">

            <AlertTriangle size={16} />

            <div>

              <strong>
                Why was this project prioritized?
              </strong>

              <span>
                {assignment.reason}
              </span>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          ASSIGNMENT HISTORY
      ================================================= */}

      <section className="history-card">

        <div className="engine-card-heading">

          <div>

            <span>
              ASSIGNMENT HISTORY
            </span>

            <h2>
              Recent AI Assignments
            </h2>

          </div>

          <ClipboardCheck size={20} />

        </div>


        {assignmentHistory.length === 0 ? (

          <div className="history-empty">
            No assignments generated yet.
          </div>

        ) : (

          <div className="history-list">

            {assignmentHistory.map((item) => (

              <div
                className="history-item"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.project}
                  </strong>

                  <span>
                    {item.location} • {item.team}
                  </span>

                </div>

                <div
                  className={`history-risk ${item.level.toLowerCase()}`}
                >
                  {item.risk}
                </div>

                <div className="history-date">
                  {item.date}
                </div>

                <div className="history-status">
                  <CheckCircle2 size={13} />
                  {item.status}
                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default AIAssignment;