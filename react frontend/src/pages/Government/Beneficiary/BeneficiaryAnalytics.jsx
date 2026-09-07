import {
  Activity,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Download,
  Filter,
  RefreshCw,
  Search,
  ShieldAlert,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../../../services/projectService";
import "./BeneficiaryAnalytics.css";


function BeneficiaryAnalytics() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  loadProjects();
}, []);

const loadProjects = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getProjects();
    setProjects(data);
  } catch (err) {
    console.error("Failed to load beneficiary data:", err);
    setError("Unable to load beneficiary data.");
  } finally {
    setLoading(false);
  }
};

const beneficiaryData = projects.map((project) => {
  const total = Number(project.beneficiary_count || 0);
  const attendance = Number(project.attendance_rate_pct || 0);
  const present = Math.round(total * attendance / 100);

  return {
    id: project.project_id,
    project: project.scheme || project.project_id,
    location: `${project.district || ""}, ${project.state || ""}`,
    total,
    present,
    attendance,
    status: attendance < 85 ? "Attention" : "Normal",
  };
});

const totalBeneficiaries = beneficiaryData.reduce(
  (sum, item) => sum + item.total,
  0
);

const totalPresent = beneficiaryData.reduce(
  (sum, item) => sum + item.present,
  0
);

const averageAttendance =
  beneficiaryData.length > 0
    ? (
        beneficiaryData.reduce(
          (sum, item) => sum + item.attendance,
          0
        ) / beneficiaryData.length
      ).toFixed(1)
    : "0.0";

const anomalies = beneficiaryData.filter(
  (item) => item.status === "Attention"
).length;

  return (
    <div className="beneficiary-page">

      {/* HEADER */}

      <header className="beneficiary-header">

        <div className="beneficiary-header-left">

          <button
            className="beneficiary-back"
            onClick={() => navigate("/government/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <span className="beneficiary-kicker">
              DEPARTMENT ANALYTICS
            </span>

            <h1>Beneficiary Analytics</h1>

            <p>
              Monitor beneficiary participation, attendance and
              project-level activity across monitored institutions.
            </p>
          </div>

        </div>

        <div className="beneficiary-header-actions">

          <div className="beneficiary-live">
            <span></span>
            ANALYTICS LIVE
          </div>

          <button
  className="beneficiary-refresh"
  onClick={loadProjects}
  disabled={loading}
>
  <RefreshCw size={15} />
  {loading ? "Refreshing..." : "Refresh"}
</button>

        </div>

      </header>


      {/* SUMMARY */}

      <section className="beneficiary-summary">

        <div className="beneficiary-stat">
          <div className="beneficiary-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>TOTAL BENEFICIARIES</span>
            <strong>{totalBeneficiaries.toLocaleString()}</strong>
            <small>Across monitored projects</small>
          </div>
        </div>

        <div className="beneficiary-stat">
          <div className="beneficiary-stat-icon">
            <UserCheck size={20} />
          </div>

          <div>
            <span>ACTIVE / PRESENT</span>
            <strong>{totalPresent.toLocaleString()}</strong>
            <small>Current reporting period</small>
          </div>
        </div>

        <div className="beneficiary-stat">
          <div className="beneficiary-stat-icon">
            <Activity size={20} />
          </div>

          <div>
            <span>AVERAGE ATTENDANCE</span>
            <strong>{averageAttendance}%</strong>
            <small>Across monitored projects</small>
          </div>
        </div>

        <div className="beneficiary-stat warning-stat">
          <div className="beneficiary-stat-icon">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>ANOMALIES DETECTED</span>
            <strong>{anomalies.toString().padStart(2, "0")}</strong>
            <small>Require departmental review</small>
          </div>
        </div>

      </section>


      {/* ANALYTICS AREA */}

      <main className="beneficiary-content">

        {/* ATTENDANCE OVERVIEW */}

        <section className="beneficiary-chart-card">

          <div className="beneficiary-card-header">

            <div>
              <span>ATTENDANCE ANALYTICS</span>
              <h2>Beneficiary Participation Overview</h2>
            </div>

            <div className="chart-actions">

              <button>
                <Filter size={15} />
                This Month
              </button>

              <button>
                <Download size={15} />
              </button>

            </div>

          </div>

          <div className="attendance-chart">

            <div className="chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="chart-area">

              <div className="chart-line line-one"></div>
              <div className="chart-line line-two"></div>
              <div className="chart-line line-three"></div>
              <div className="chart-line line-four"></div>

              <div className="chart-bars">

                <div className="bar-group">
                  <div className="bar normal" style={{ height: "94%" }}></div>
                  <span>Sunrise</span>
                </div>

                <div className="bar-group">
                  <div className="bar normal" style={{ height: "94%" }}></div>
                  <span>Udaan</span>
                </div>

                <div className="bar-group">
                  <div className="bar attention" style={{ height: "81%" }}></div>
                  <span>Asha</span>
                </div>

                <div className="bar-group">
                  <div className="bar normal" style={{ height: "95%" }}></div>
                  <span>Sarthak</span>
                </div>

                <div className="bar-group">
                  <div className="bar attention" style={{ height: "80%" }}></div>
                  <span>Pragati</span>
                </div>

              </div>

            </div>

          </div>

          <div className="chart-legend">

            <div>
              <span className="legend-normal"></span>
              Normal attendance
            </div>

            <div>
              <span className="legend-warning"></span>
              Requires attention
            </div>

          </div>

        </section>


        {/* ANOMALY PANEL */}

        <section className="anomaly-card">

          <div className="beneficiary-card-header">

            <div>
              <span>AI-BASED ANALYTICS</span>
              <h2>Attendance Anomalies</h2>
            </div>

            <ShieldAlert size={20} />

          </div>

          <div className="anomaly-summary">

            <div className="anomaly-number">
              <strong>07</strong>
              <span>Detected cases</span>
            </div>

            <div className="anomaly-description">
              <ShieldAlert size={17} />
              <p>
                Potential attendance irregularities identified
                through monitoring analytics.
              </p>
            </div>

          </div>

          <button
            className="review-anomalies"
            onClick={() =>
              document
                .getElementById("beneficiary-table")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Review project data
            <BarChart3 size={15} />
          </button>

        </section>


        {/* PROJECT DATA */}

        <section
          className="beneficiary-table-card"
          id="beneficiary-table"
        >

          <div className="beneficiary-card-header">

            <div>
              <span>PROJECT-WISE DATA</span>
              <h2>Beneficiary Monitoring</h2>
            </div>

            <div className="table-search">

              <Search size={15} />

             <input
  type="text"
  placeholder="Search project or location"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

            </div>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>PROJECT</th>
                  <th>LOCATION</th>
                  <th>BENEFICIARIES</th>
                  <th>PRESENT</th>
                  <th>ATTENDANCE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                {beneficiaryData
  .filter((item) => {
    const search = searchTerm.toLowerCase();

   return (
  item.id.toLowerCase().includes(search) ||
  item.project.toLowerCase().includes(search) ||
  item.location.toLowerCase().includes(search)
);
  })
  .map((item) => (

                  <tr key={item.id}>

                    <td>
                      <div className="project-cell">
                        <strong>{item.project}</strong>
                        <span>{item.id}</span>
                      </div>
                    </td>

                    <td>{item.location}</td>

                    <td>{item.total.toLocaleString()}</td>

                    <td>{item.present.toLocaleString()}</td>

                    <td>

                      <div className="attendance-cell">

                        <div className="attendance-track">
                          <span
                            style={{
                              width: `${item.attendance}%`,
                            }}
                          ></span>
                        </div>

                        <strong>
                          {item.attendance}%
                        </strong>

                      </div>

                    </td>

                    <td>

                      {item.status === "Normal" ? (
                        <span className="status-normal">
                          <CheckCircle2 size={13} />
                          Normal
                        </span>
                      ) : (
                        <span className="status-attention">
                          <UserX size={13} />
                          Attention
                        </span>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default BeneficiaryAnalytics;