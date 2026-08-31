import {
  Activity,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Filter,
  Map,
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./GeographicMonitoring.css";

const locations = [
  {
    id: "PRJ-001",
    name: "Project Sunrise",
    type: "NGO",
    location: "New Delhi, Delhi",
    status: "Operational",
    inspection: "Verified",
    x: "24%",
    y: "32%",
  },
  {
    id: "PRJ-002",
    name: "Community Support Centre",
    type: "Institute",
    location: "Jaipur, Rajasthan",
    status: "Operational",
    inspection: "Pending",
    x: "31%",
    y: "56%",
  },
  {
    id: "PRJ-003",
    name: "Inclusive Development Centre",
    type: "NGO",
    location: "Lucknow, Uttar Pradesh",
    status: "Attention",
    inspection: "Required",
    x: "52%",
    y: "35%",
  },
  {
    id: "PRJ-004",
    name: "District Rehabilitation Centre",
    type: "Institute",
    location: "Patna, Bihar",
    status: "Operational",
    inspection: "Verified",
    x: "68%",
    y: "47%",
  },
  {
    id: "PRJ-005",
    name: "Social Empowerment Centre",
    type: "NGO",
    location: "Bhubaneswar, Odisha",
    status: "Operational",
    inspection: "Pending",
    x: "73%",
    y: "72%",
  },
];

function GeographicMonitoring() {
  const navigate = useNavigate();

  return (
    <div className="geo-page">
      <aside className="geo-sidebar">
        <div className="geo-brand">
          <div className="geo-brand-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>Smart Monitoring</strong>
            <span>DoSJE Command Centre</span>
          </div>
        </div>

        <div className="geo-sidebar-section">
          <span>LOCATION MONITORING</span>

          <div className="geo-sidebar-active">
            <Map size={17} />
            Geographic Monitoring
          </div>
        </div>

        <div className="geo-sidebar-info">
          <div className="geo-online-dot"></div>

          <div>
            <strong>Monitoring Network</strong>
            <span>System operational</span>
          </div>
        </div>

        <button
          className="geo-back-button"
          onClick={() => navigate("/government/dashboard")}
        >
          <ArrowLeft size={16} />
          Back to Command Centre
        </button>
      </aside>

      <main className="geo-main">
        <header className="geo-topbar">
          <div className="geo-header-left">

  <button
    className="geo-back-button"
    onClick={() => navigate("/government/dashboard")}
    aria-label="Back to dashboard"
  >
    <ArrowLeft size={18} />
  </button>

  <div>
    <div className="geo-topbar-label">
      NATIONAL LOCATION INTELLIGENCE
    </div>

    <h1>Geographic Monitoring</h1>
  </div>

</div>

          <div className="geo-top-actions">
            <div className="geo-live-status">
              <span></span>
              LIVE DATA
            </div>

            <button className="geo-refresh">
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>
        </header>

        <section className="geo-content">
          <div className="geo-introduction">
            <div>
              <div className="geo-page-tag">
                <Navigation size={14} />
                GEO-TAGGED MONITORING
              </div>

              <h2>Project & Inspection Locations</h2>

              <p>
                Monitor the geographic distribution of projects, institutions
                and inspection activities across the monitored network.
              </p>
            </div>

            <div className="geo-location-summary">
              <MapPin size={19} />

              <div>
                <strong>248</strong>
                <span>Mapped locations</span>
              </div>
            </div>
          </div>

          <div className="geo-stats">
            <div className="geo-stat-card">
              <div className="geo-stat-icon">
                <MapPin size={19} />
              </div>

              <div>
                <span>Total Locations</span>
                <strong>248</strong>
                <small>Registered locations</small>
              </div>
            </div>

            <div className="geo-stat-card">
              <div className="geo-stat-icon green">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <span>Operational</span>
                <strong>221</strong>
                <small>Currently active</small>
              </div>
            </div>

            <div className="geo-stat-card">
              <div className="geo-stat-icon orange">
                <Clock3 size={19} />
              </div>

              <div>
                <span>Inspections Pending</span>
                <strong>19</strong>
                <small>Awaiting verification</small>
              </div>
            </div>

            <div className="geo-stat-card">
              <div className="geo-stat-icon red">
                <XCircle size={19} />
              </div>

              <div>
                <span>Attention Required</span>
                <strong>08</strong>
                <small>Require review</small>
              </div>
            </div>
          </div>

          <div className="geo-toolbar">
            <div className="geo-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search project, institute or location..."
              />
            </div>

            <button className="geo-filter-button">
              <Filter size={16} />
              Filter
            </button>

            <select className="geo-select">
              <option>All Locations</option>
              <option>NGO</option>
              <option>Institute</option>
            </select>

            <select className="geo-select">
              <option>All Status</option>
              <option>Operational</option>
              <option>Attention</option>
            </select>
          </div>

          <div className="geo-workspace">
            <div className="geo-map-card">
              <div className="geo-card-header">
                <div>
                  <span>LIVE LOCATION VIEW</span>
                  <h3>Monitored Project Network</h3>
                </div>

                <div className="geo-map-legend">
                  <span>
                    <i className="legend-green"></i>
                    Operational
                  </span>

                  <span>
                    <i className="legend-orange"></i>
                    Pending
                  </span>

                  <span>
                    <i className="legend-red"></i>
                    Attention
                  </span>
                </div>
              </div>

              <div className="geo-map">
                <div className="geo-map-grid"></div>

                <div className="geo-map-lines line-one"></div>
                <div className="geo-map-lines line-two"></div>
                <div className="geo-map-lines line-three"></div>

                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`geo-marker ${
                      location.status === "Attention"
                        ? "attention"
                        : location.inspection === "Pending"
                        ? "pending"
                        : ""
                    }`}
                    style={{
                      left: location.x,
                      top: location.y,
                    }}
                    title={location.name}
                  >
                    <MapPin size={21} />
                  </div>
                ))}

                <div className="geo-map-centre">
                  <Map size={27} />
                  <strong>National Monitoring Map</strong>
                  <span>Geo-tagged project locations</span>
                </div>

                <div className="geo-map-controls">
                  <button>+</button>
                  <button>−</button>
                </div>
              </div>
            </div>

            <div className="geo-location-card">
              <div className="geo-card-header">
                <div>
                  <span>MONITORED LOCATIONS</span>
                  <h3>Project Directory</h3>
                </div>

                <Building2 size={19} />
              </div>

              <div className="geo-location-list">
                {locations.map((location) => (
                  <div className="geo-location-item" key={location.id}>
                    <div className="geo-location-icon">
                      <MapPin size={16} />
                    </div>

                    <div className="geo-location-details">
                      <strong>{location.name}</strong>

                      <span>
                        {location.type} • {location.location}
                      </span>

                      <small>{location.id}</small>
                    </div>

                    <div
                      className={`geo-status ${
                        location.status === "Attention"
                          ? "danger"
                          : location.inspection === "Pending"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {location.status}
                    </div>
                  </div>
                ))}
              </div>

              <button className="geo-view-all">
                View All Locations
                <Navigation size={15} />
              </button>
            </div>
          </div>

          <div className="geo-bottom-grid">
            <div className="geo-info-card">
              <div className="geo-info-icon">
                <ClipboardIcon />
              </div>

              <div>
                <span>GEO-TAGGED INSPECTIONS</span>
                <h3>Location-based verification</h3>

                <p>
                  Inspection reports can be associated with verified project
                  locations to support transparent field monitoring and
                  compliance review.
                </p>
              </div>
            </div>

            <div className="geo-info-card">
              <div className="geo-info-icon">
                <Users size={19} />
              </div>

              <div>
                <span>FIELD OPERATIONS</span>
                <h3>Inspection team visibility</h3>

                <p>
                  Monitor inspection activity and location-linked field
                  operations from the Department command centre.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ClipboardIcon() {
  return <Activity size={19} />;
}

export default GeographicMonitoring;