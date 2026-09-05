import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./Inspections.css";

const inspectionData = [
  {
    id: "INS-2026-001",
    project: "Project Asha",
    institution: "Asha Welfare Institute",
    location: "New Delhi",
    inspector: "PMU Team 04",
    assignedDate: "28 Aug 2026",
    inspectionDate: "30 Aug 2026",
    status: "In Progress",
    priority: "Normal",
    evidence: 12,
  },
  {
    id: "INS-2026-002",
    project: "Project Udaan",
    institution: "Udaan Development Centre",
    location: "Gurugram",
    inspector: "PMU Team 07",
    assignedDate: "27 Aug 2026",
    inspectionDate: "29 Aug 2026",
    status: "Pending Verification",
    priority: "High",
    evidence: 18,
  },
  {
    id: "INS-2026-003",
    project: "Project Saksham",
    institution: "Saksham Support Foundation",
    location: "Jaipur",
    inspector: "PMU Team 02",
    assignedDate: "26 Aug 2026",
    inspectionDate: "28 Aug 2026",
    status: "Completed",
    priority: "Normal",
    evidence: 24,
  },
  {
    id: "INS-2026-004",
    project: "Project Nirmaan",
    institution: "Nirmaan Community Centre",
    location: "Lucknow",
    inspector: "PMU Team 09",
    assignedDate: "25 Aug 2026",
    inspectionDate: "27 Aug 2026",
    status: "Completed",
    priority: "Low",
    evidence: 16,
  },
  {
    id: "INS-2026-005",
    project: "Project Sahayata",
    institution: "Sahayata Social Organisation",
    location: "Bhopal",
    inspector: "PMU Team 05",
    assignedDate: "29 Aug 2026",
    inspectionDate: "01 Sep 2026",
    status: "Assigned",
    priority: "High",
    evidence: 0,
  },
  {
    id: "INS-2026-006",
    project: "Project Pragati",
    institution: "Pragati Welfare Centre",
    location: "Chandigarh",
    inspector: "PMU Team 03",
    assignedDate: "24 Aug 2026",
    inspectionDate: "26 Aug 2026",
    status: "Pending Verification",
    priority: "Normal",
    evidence: 21,
  },
];

function Inspections() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedInspection, setSelectedInspection] = useState(null);

  const filteredInspections = useMemo(() => {
    return inspectionData.filter((inspection) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        inspection.id.toLowerCase().includes(search) ||
        inspection.project.toLowerCase().includes(search) ||
        inspection.institution.toLowerCase().includes(search) ||
        inspection.location.toLowerCase().includes(search) ||
        inspection.inspector.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        inspection.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        inspection.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  const totalInspections = inspectionData.length;

  const assignedCount = inspectionData.filter(
    (item) => item.status === "Assigned"
  ).length;

  const inProgressCount = inspectionData.filter(
    (item) => item.status === "In Progress"
  ).length;

  const pendingCount = inspectionData.filter(
    (item) => item.status === "Pending Verification"
  ).length;

  const completedCount = inspectionData.filter(
    (item) => item.status === "Completed"
  ).length;

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "In Progress") return "status-progress";
    if (status === "Pending Verification") return "status-pending";
    return "status-assigned";
  };

  const getPriorityClass = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Low") return "priority-low";
    return "priority-normal";
  };

  /* ================================
     EXPORT REPORT
  ================================= */

  const handleExport = () => {
    const headers = [
      "Inspection ID",
      "Project",
      "Institution",
      "Location",
      "Inspection Team",
      "Assigned Date",
      "Inspection Date",
      "Priority",
      "Status",
      "Evidence",
    ];

    const rows = filteredInspections.map((inspection) => [
      inspection.id,
      inspection.project,
      inspection.institution,
      inspection.location,
      inspection.inspector,
      inspection.assignedDate,
      inspection.inspectionDate,
      inspection.priority,
      inspection.status,
      `${inspection.evidence} files`,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `inspection-report-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ================================
     OPEN VERIFICATION
  ================================= */

  const handleReviewSubmission = () => {
    if (!selectedInspection) return;

    navigate(
      "/government/dashboard/inspections/verification",
      {
        state: {
          inspection: selectedInspection,
        },
      }
    );
  };

  return (
    <div className="inspections-page">

      {/* TOP HEADER */}

      <header className="inspection-header">

        <div className="inspection-header-left">

          <button
            className="back-button"
            onClick={() =>
              navigate("/government/dashboard")
            }
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="header-title">

            <div className="header-kicker">
              <ShieldCheck size={14} />
              GOVERNMENT MONITORING
            </div>

            <h1>Inspection Management</h1>

            <p>
              Monitor assignments, field inspections, verification and
              evidence submitted by inspection teams.
            </p>

          </div>

        </div>

        <button
          className="export-button"
          onClick={handleExport}
        >
          <Download size={16} />
          Export Report
        </button>

      </header>


      {/* CONTENT */}

      <main className="inspection-content">

        {/* OVERVIEW */}

        <section className="inspection-overview">

          <div className="overview-heading">

            <div>
              <span>INSPECTION OVERVIEW</span>
              <h2>National Inspection Activity</h2>
            </div>

            <div className="live-indicator">
              <span></span>
              LIVE DATA
            </div>

          </div>


          <div className="inspection-stats">

            {/* TOTAL */}

            <div
              className={`inspection-stat ${
                statusFilter === "All"
                  ? "stat-active"
                  : ""
              }`}
              onClick={() => setStatusFilter("All")}
            >

              <div className="inspection-stat-icon blue">
                <ClipboardCheck size={19} />
              </div>

              <div>
                <span>Total Inspections</span>
                <strong>{totalInspections}</strong>
                <small>Recorded assignments</small>
              </div>

            </div>


            {/* ASSIGNED */}

            <div
              className={`inspection-stat ${
                statusFilter === "Assigned"
                  ? "stat-active"
                  : ""
              }`}
              onClick={() => setStatusFilter("Assigned")}
            >

              <div className="inspection-stat-icon purple">
                <Users size={19} />
              </div>

              <div>
                <span>Assigned</span>
                <strong>{assignedCount}</strong>
                <small>Awaiting field activity</small>
              </div>

            </div>


            {/* IN PROGRESS */}

            <div
              className={`inspection-stat ${
                statusFilter === "In Progress"
                  ? "stat-active"
                  : ""
              }`}
              onClick={() => setStatusFilter("In Progress")}
            >

              <div className="inspection-stat-icon orange">
                <Clock3 size={19} />
              </div>

              <div>
                <span>In Progress</span>
                <strong>{inProgressCount}</strong>
                <small>Currently active</small>
              </div>

            </div>


            {/* PENDING */}

            <div
              className={`inspection-stat ${
                statusFilter === "Pending Verification"
                  ? "stat-active"
                  : ""
              }`}
              onClick={() =>
                setStatusFilter("Pending Verification")
              }
            >

              <div className="inspection-stat-icon amber">
                <FileCheck2 size={19} />
              </div>

              <div>
                <span>Pending Verification</span>
                <strong>{pendingCount}</strong>
                <small>Requires review</small>
              </div>

            </div>


            {/* COMPLETED */}

            <div
              className={`inspection-stat ${
                statusFilter === "Completed"
                  ? "stat-active"
                  : ""
              }`}
              onClick={() => setStatusFilter("Completed")}
            >

              <div className="inspection-stat-icon green">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <span>Completed</span>
                <strong>{completedCount}</strong>
                <small>Successfully submitted</small>
              </div>

            </div>

          </div>

        </section>


        {/* TABLE SECTION */}

        <section className="inspection-table-card">

          <div className="table-top">

            <div>

              <span className="table-kicker">
                FIELD OPERATIONS
              </span>

              <h2>Inspection Records</h2>

              <p>
                Review inspection activity received from PMU and
                authorised inspection teams.
              </p>

            </div>

            <div className="record-count">
              {filteredInspections.length} Records
            </div>

          </div>


          {/* FILTERS */}

          <div className="inspection-filters">

            <div className="search-box">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search project, institution, location..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>


            {/* STATUS FILTER */}

            <div className="filter-select">

              <Filter size={15} />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >

                <option value="All">
                  All Status
                </option>

                <option value="Assigned">
                  Assigned
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Pending Verification">
                  Pending Verification
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

              <ChevronDown size={14} />

            </div>


            {/* PRIORITY FILTER */}

            <div className="filter-select">

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >

                <option value="All">
                  All Priority
                </option>

                <option value="High">
                  High
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="Low">
                  Low
                </option>

              </select>

              <ChevronDown size={14} />

            </div>

          </div>


          {/* TABLE */}

          <div className="table-wrapper">

            <table className="inspection-table">

              <thead>

                <tr>
                  <th>Inspection</th>
                  <th>Project / Institution</th>
                  <th>Location</th>
                  <th>Inspection Team</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {filteredInspections.length > 0 ? (

                  filteredInspections.map(
                    (inspection) => (

                      <tr key={inspection.id}>

                        {/* INSPECTION */}

                        <td>

                          <div className="inspection-id">

                            <strong>
                              {inspection.id}
                            </strong>

                            <span>
                              Assigned{" "}
                              {inspection.assignedDate}
                            </span>

                          </div>

                        </td>


                        {/* PROJECT */}

                        <td>

                          <div className="project-cell">

                            <strong>
                              {inspection.project}
                            </strong>

                            <span>
                              {inspection.institution}
                            </span>

                          </div>

                        </td>


                        {/* LOCATION */}

                        <td>

                          <div className="location-cell">

                            <MapPin size={14} />

                            {inspection.location}

                          </div>

                        </td>


                        {/* TEAM */}

                        <td>

                          <div className="team-cell">

                            <div className="team-avatar">

                              {inspection.inspector
                                .replace(
                                  "PMU Team ",
                                  "T"
                                )
                                .trim()}

                            </div>

                            <span>
                              {inspection.inspector}
                            </span>

                          </div>

                        </td>


                        {/* DATE */}

                        <td>

                          <div className="date-cell">

                            <CalendarDays size={14} />

                            {inspection.inspectionDate}

                          </div>

                        </td>


                        {/* PRIORITY */}

                        <td>

                          <span
                            className={`priority-badge ${getPriorityClass(
                              inspection.priority
                            )}`}
                          >
                            {inspection.priority}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`status-badge ${getStatusClass(
                              inspection.status
                            )}`}
                          >

                            <span></span>

                            {inspection.status}

                          </span>

                        </td>


                        {/* VIEW */}

                        <td>

                          <button
                            className="view-button"
                            onClick={() =>
                              setSelectedInspection(
                                inspection
                              )
                            }
                          >

                            <Eye size={15} />

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="empty-state"
                    >

                      <Search size={24} />

                      <strong>
                        No inspections found
                      </strong>

                      <span>
                        Try changing your search or
                        filter settings.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* VERIFICATION NOTICE */}

        <section className="verification-panel">

          <div className="verification-icon">

            <ShieldCheck size={21} />

          </div>

          <div>

            <strong>
              Evidence-based verification
            </strong>

            <p>
              Inspection reports, geo-tagged evidence and
              field submissions can be reviewed here before
              verification. Backend integration will connect
              these records with the Inspector mobile
              application.
            </p>

          </div>

        </section>

      </main>


      {/* DETAILS MODAL */}

      {selectedInspection && (

        <div
          className="inspection-modal-overlay"
          onClick={() =>
            setSelectedInspection(null)
          }
        >

          <div
            className="inspection-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <span>
                  INSPECTION DETAILS
                </span>

                <h2>
                  {selectedInspection.id}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedInspection(null)
                }
              >

                <XCircle size={20} />

              </button>

            </div>


            {/* STATUS */}

            <div className="modal-status-row">

              <span
                className={`status-badge ${getStatusClass(
                  selectedInspection.status
                )}`}
              >

                <span></span>

                {selectedInspection.status}

              </span>


              <span
                className={`priority-badge ${getPriorityClass(
                  selectedInspection.priority
                )}`}
              >

                {selectedInspection.priority} Priority

              </span>

            </div>


            {/* DETAILS */}

            <div className="modal-details">

              <div className="detail-item">

                <span>PROJECT</span>

                <strong>
                  {selectedInspection.project}
                </strong>

              </div>


              <div className="detail-item">

                <span>INSTITUTION</span>

                <strong>
                  {selectedInspection.institution}
                </strong>

              </div>


              <div className="detail-item">

                <span>LOCATION</span>

                <strong>
                  {selectedInspection.location}
                </strong>

              </div>


              <div className="detail-item">

                <span>INSPECTION TEAM</span>

                <strong>
                  {selectedInspection.inspector}
                </strong>

              </div>


              <div className="detail-item">

                <span>ASSIGNED DATE</span>

                <strong>
                  {selectedInspection.assignedDate}
                </strong>

              </div>


              <div className="detail-item">

                <span>INSPECTION DATE</span>

                <strong>
                  {selectedInspection.inspectionDate}
                </strong>

              </div>


              <div className="detail-item">

                <span>FIELD EVIDENCE</span>

                <strong>
                  {selectedInspection.evidence} files
                </strong>

              </div>


              <div className="detail-item">

                <span>VERIFICATION</span>

                <strong>

                  {selectedInspection.status ===
                  "Pending Verification"
                    ? "Action Required"
                    : "Monitoring"}

                </strong>

              </div>

            </div>


            {/* MODAL ACTIONS */}

            <div className="modal-actions">

              <button
                className="secondary-modal-button"
                onClick={() =>
                  setSelectedInspection(null)
                }
              >
                Close
              </button>


              {selectedInspection.status ===
                "Pending Verification" && (

                <button
                  className="primary-modal-button"
                  onClick={handleReviewSubmission}
                >

                  <FileCheck2 size={16} />

                  Review Submission

                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Inspections;