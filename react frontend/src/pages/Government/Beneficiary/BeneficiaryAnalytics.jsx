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
import "./BeneficiaryAnalytics.css";

const beneficiaryData = [
  {
    id: "BEN-10482",
    project: "Project Sunrise",
    location: "Kurukshetra, Haryana",
    total: 1240,
    present: 1168,
    attendance: 94.2,
    status: "Normal",
  },
  {
    id: "BEN-09831",
    project: "Project Udaan",
    location: "New Delhi, Delhi",
    total: 980,
    present: 921,
    attendance: 93.9,
    status: "Normal",
  },
  {
    id: "BEN-08745",
    project: "Project Asha",
    location: "Jaipur, Rajasthan",
    total: 760,
    present: 612,
    attendance: 80.5,
    status: "Attention",
  },
  {
    id: "BEN-07621",
    project: "Project Sarthak",
    location: "Lucknow, Uttar Pradesh",
    total: 1530,
    present: 1458,
    attendance: 95.3,
    status: "Normal",
  },
  {
    id: "BEN-06418",
    project: "Project Pragati",
    location: "Patna, Bihar",
    total: 1120,
    present: 894,
    attendance: 79.8,
    status: "Attention",
  },
];

function BeneficiaryAnalytics() {
  const navigate = useNavigate();

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

          <button className="beneficiary-refresh">
            <RefreshCw size={15} />
            Refresh
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
            <strong>5,630</strong>
            <small>Across monitored projects</small>
          </div>
        </div>

        <div className="beneficiary-stat">
          <div className="beneficiary-stat-icon">
            <UserCheck size={20} />
          </div>

          <div>
            <span>ACTIVE / PRESENT</span>
            <strong>5,053</strong>
            <small>Current reporting period</small>
          </div>
        </div>

        <div className="beneficiary-stat">
          <div className="beneficiary-stat-icon">
            <Activity size={20} />
          </div>

          <div>
            <span>AVERAGE ATTENDANCE</span>
            <strong>89.7%</strong>
            <small>Across monitored projects</small>
          </div>
        </div>

        <div className="beneficiary-stat warning-stat">
          <div className="beneficiary-stat-icon">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>ANOMALIES DETECTED</span>
            <strong>07</strong>
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

                {beneficiaryData.map((item) => (

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