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
  ClipboardCheck,
  LocateFixed,
  Eye,
  ChevronRight,
  Radio,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GeographicMonitoring.css";

/*
=========================================================
BACKEND-READY DATA STRUCTURE
---------------------------------------------------------
Later replace this local data with API response.

Example future API:
GET /api/government/geographic/locations

The UI already expects this structure.
=========================================================
*/

const locations = [
  {
    id: "PRJ-001",
    name: "Project Sunrise",
    type: "NGO",
    location: "New Delhi, Delhi",
    state: "Delhi",
    status: "Operational",
    inspection: "Verified",
    lastInspection: "28 Aug 2026",
    team: "PMU Team 01",
    latitude: 28.6139,
    longitude: 77.209,
    x: "24%",
    y: "32%",
  },
  {
    id: "PRJ-002",
    name: "Community Support Centre",
    type: "Institute",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    status: "Operational",
    inspection: "Pending",
    lastInspection: "24 Aug 2026",
    team: "PMU Team 03",
    latitude: 26.9124,
    longitude: 75.7873,
    x: "31%",
    y: "56%",
  },
  {
    id: "PRJ-003",
    name: "Inclusive Development Centre",
    type: "NGO",
    location: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh",
    status: "Attention",
    inspection: "Required",
    lastInspection: "18 Aug 2026",
    team: "PMU Team 07",
    latitude: 26.8467,
    longitude: 80.9462,
    x: "52%",
    y: "35%",
  },
  {
    id: "PRJ-004",
    name: "District Rehabilitation Centre",
    type: "Institute",
    location: "Patna, Bihar",
    state: "Bihar",
    status: "Operational",
    inspection: "Verified",
    lastInspection: "27 Aug 2026",
    team: "PMU Team 05",
    latitude: 25.5941,
    longitude: 85.1376,
    x: "68%",
    y: "47%",
  },
  {
    id: "PRJ-005",
    name: "Social Empowerment Centre",
    type: "NGO",
    location: "Bhubaneswar, Odisha",
    state: "Odisha",
    status: "Operational",
    inspection: "Pending",
    lastInspection: "22 Aug 2026",
    team: "PMU Team 09",
    latitude: 20.2961,
    longitude: 85.8245,
    x: "73%",
    y: "72%",
  },
  {
    id: "PRJ-006",
    name: "Saksham Learning Centre",
    type: "Institute",
    location: "Chandigarh",
    state: "Chandigarh",
    status: "Operational",
    inspection: "Verified",
    lastInspection: "29 Aug 2026",
    team: "PMU Team 02",
    latitude: 30.7333,
    longitude: 76.7794,
    x: "28%",
    y: "20%",
  },
  {
    id: "PRJ-007",
    name: "Nayi Disha Centre",
    type: "NGO",
    location: "Bhopal, Madhya Pradesh",
    state: "Madhya Pradesh",
    status: "Operational",
    inspection: "Verified",
    lastInspection: "26 Aug 2026",
    team: "PMU Team 04",
    latitude: 23.2599,
    longitude: 77.4126,
    x: "46%",
    y: "51%",
  },
  {
    id: "PRJ-008",
    name: "Ujjwal Support Centre",
    type: "Institute",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    status: "Attention",
    inspection: "Required",
    lastInspection: "16 Aug 2026",
    team: "PMU Team 08",
    latitude: 22.5726,
    longitude: 88.3639,
    x: "82%",
    y: "53%",
  },
];


/*
=========================================================
FIELD OPERATIONS DATA
=========================================================
*/

const fieldOperations = [
  {
    id: "FO-001",
    team: "PMU Team 07",
    project: "Inclusive Development Centre",
    location: "Lucknow, Uttar Pradesh",
    status: "On Field",
    time: "10 min ago",
  },
  {
    id: "FO-002",
    team: "PMU Team 03",
    project: "Community Support Centre",
    location: "Jaipur, Rajasthan",
    status: "Inspection Pending",
    time: "32 min ago",
  },
  {
    id: "FO-003",
    team: "PMU Team 09",
    project: "Social Empowerment Centre",
    location: "Bhubaneswar, Odisha",
    status: "Completed",
    time: "1 hr ago",
  },
];


/*
=========================================================
GEO-TAGGED INSPECTIONS
=========================================================
*/

const inspections = [
  {
    id: "INS-1001",
    project: "Project Sunrise",
    location: "New Delhi, Delhi",
    team: "PMU Team 01",
    status: "Verified",
    date: "28 Aug 2026",
  },
  {
    id: "INS-1002",
    project: "Community Support Centre",
    location: "Jaipur, Rajasthan",
    team: "PMU Team 03",
    status: "Pending",
    date: "24 Aug 2026",
  },
  {
    id: "INS-1003",
    project: "Inclusive Development Centre",
    location: "Lucknow, Uttar Pradesh",
    team: "PMU Team 07",
    status: "Required",
    date: "18 Aug 2026",
  },
];


/*
=========================================================
COMPONENT
=========================================================
*/

function GeographicMonitoring() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showInspections, setShowInspections] = useState(false);
  const [showFieldOperations, setShowFieldOperations] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [lastRefresh, setLastRefresh] = useState("Just now");

  /*
  ========================================================
  FILTER LOGIC
  ========================================================
  */

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        location.name.toLowerCase().includes(searchText) ||
        location.location.toLowerCase().includes(searchText) ||
        location.id.toLowerCase().includes(searchText) ||
        location.type.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All Locations" ||
        location.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        location.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);


  /*
  ========================================================
  DYNAMIC STATISTICS
  ========================================================
  */

  const totalLocations = locations.length;

  const operationalLocations = locations.filter(
    (location) => location.status === "Operational"
  ).length;

  const pendingInspections = locations.filter(
    (location) => location.inspection === "Pending"
  ).length;

  const attentionLocations = locations.filter(
    (location) => location.status === "Attention"
  ).length;


  /*
  ========================================================
  REFRESH
  ========================================================
  */

  const handleRefresh = () => {
    setLastRefresh("Just now");

    setTimeout(() => {
      setLastRefresh("Updated moments ago");
    }, 1000);
  };


  /*
  ========================================================
  MAP ZOOM
  ========================================================
  */

  const zoomIn = () => {
    setZoom((current) => Math.min(current + 0.15, 1.8));
  };

  const zoomOut = () => {
    setZoom((current) => Math.max(current - 0.15, 0.8));
  };


  /*
  ========================================================
  MARKER STATUS
  ========================================================
  */

  const getMarkerClass = (location) => {
    if (location.status === "Attention") {
      return "attention";
    }

    if (location.inspection === "Pending") {
      return "pending";
    }

    return "operational";
  };


  return (
    <div className="geo-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}

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


        <div className="geo-sidebar-links">

          <button
            onClick={() => setShowInspections(true)}
          >
            <ClipboardCheck size={16} />
            Geo-tagged Inspections
          </button>

          <button
            onClick={() => setShowFieldOperations(true)}
          >
            <Users size={16} />
            Field Operations
          </button>

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


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="geo-main">


        {/* TOPBAR */}

        <header className="geo-topbar">

          <div className="geo-header-left">

            <button
              className="geo-back-icon"
              onClick={() => navigate("/government/dashboard")}
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={18} />
            </button>

            <div>

              <div className="geo-topbar-label">
                NATIONAL LOCATION INTELLIGENCE
              </div>

              <h1>
                Geographic Monitoring
              </h1>

            </div>

          </div>


          <div className="geo-top-actions">

            <div className="geo-live-status">

              <span></span>

              LIVE DATA

            </div>


            <button
              className="geo-refresh"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

          </div>

        </header>


        {/* CONTENT */}

        <section className="geo-content">


          {/* INTRODUCTION */}

          <div className="geo-introduction">

            <div>

              <div className="geo-page-tag">
                <Navigation size={14} />
                GEO-TAGGED MONITORING
              </div>

              <h2>
                Project & Inspection Locations
              </h2>

              <p>
                Monitor the geographic distribution of projects,
                institutions, inspections and field operations
                across the monitored network.
              </p>

            </div>


            <div className="geo-location-summary">

              <MapPin size={19} />

              <div>
                <strong>{totalLocations}</strong>
                <span>Mapped locations</span>
              </div>

            </div>

          </div>


          {/* STATS */}

          <div className="geo-stats">

            <div className="geo-stat-card">

              <div className="geo-stat-icon">
                <MapPin size={19} />
              </div>

              <div>
                <span>Total Locations</span>
                <strong>{totalLocations}</strong>
                <small>Registered locations</small>
              </div>

            </div>


            <div className="geo-stat-card">

              <div className="geo-stat-icon green">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <span>Operational</span>
                <strong>{operationalLocations}</strong>
                <small>Currently active</small>
              </div>

            </div>


            <div className="geo-stat-card">

              <div className="geo-stat-icon orange">
                <Clock3 size={19} />
              </div>

              <div>
                <span>Inspections Pending</span>
                <strong>{pendingInspections}</strong>
                <small>Awaiting verification</small>
              </div>

            </div>


            <div className="geo-stat-card">

              <div className="geo-stat-icon red">
                <XCircle size={19} />
              </div>

              <div>
                <span>Attention Required</span>
                <strong>{attentionLocations}</strong>
                <small>Require review</small>
              </div>

            </div>

          </div>


          {/* TOOLBAR */}

          <div className="geo-toolbar">

            <div className="geo-search">

              <Search size={17} />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search project, institute or location..."
              />

            </div>


            <button
              className="geo-filter-button"
              onClick={() => {
                setSearch("");
                setTypeFilter("All Locations");
                setStatusFilter("All Status");
              }}
            >
              <Filter size={16} />
              Clear Filters
            </button>


            <select
              className="geo-select"
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
            >
              <option>All Locations</option>
              <option>NGO</option>
              <option>Institute</option>
            </select>


            <select
              className="geo-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All Status</option>
              <option>Operational</option>
              <option>Attention</option>
            </select>

          </div>


          {/* =================================================
              WORKSPACE
          ================================================= */}

          <div className="geo-workspace">


            {/* MAP */}

            <div className="geo-map-card">

              <div className="geo-card-header">

                <div>

                  <span>
                    LIVE LOCATION VIEW
                  </span>

                  <h3>
                    Monitored Project Network
                  </h3>

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


              <div className="geo-map-wrapper">

                <div
                  className="geo-map"
                  style={{
                    transform: `scale(${zoom})`,
                  }}
                >

                  <div className="geo-map-grid"></div>

                  <div className="india-outline"></div>


                  {/* NETWORK LINES */}

                  <div className="geo-map-lines line-one"></div>
                  <div className="geo-map-lines line-two"></div>
                  <div className="geo-map-lines line-three"></div>
                  <div className="geo-map-lines line-four"></div>


                  {/* MARKERS */}

                  {filteredLocations.map((location) => (

                    <button
                      key={location.id}
                      className={`geo-marker ${getMarkerClass(location)}`}
                      style={{
                        left: location.x,
                        top: location.y,
                      }}
                      onClick={() =>
                        setSelectedLocation(location)
                      }
                      title={location.name}
                    >
                      <MapPin size={21} />
                    </button>

                  ))}


                  {/* CENTER */}

                  {!selectedLocation && (
                    <div className="geo-map-centre">

                      <Map size={27} />

                      <strong>
                        National Monitoring Map
                      </strong>

                      <span>
                        {filteredLocations.length} locations visible
                      </span>

                    </div>
                  )}


                  {/* SELECTED LOCATION */}

                  {selectedLocation && (

                    <div className="geo-selected-location">

                      <button
                        className="geo-close-selection"
                        onClick={() =>
                          setSelectedLocation(null)
                        }
                      >
                        ×
                      </button>

                      <div className="selected-location-icon">
                        <MapPin size={17} />
                      </div>

                      <div>

                        <strong>
                          {selectedLocation.name}
                        </strong>

                        <span>
                          {selectedLocation.location}
                        </span>

                        <small>
                          {selectedLocation.id} •{" "}
                          {selectedLocation.status}
                        </small>

                      </div>

                    </div>

                  )}

                </div>


                {/* MAP CONTROLS */}

                <div className="geo-map-controls">

                  <button
                    onClick={zoomIn}
                    aria-label="Zoom in"
                  >
                    +
                  </button>

                  <button
                    onClick={zoomOut}
                    aria-label="Zoom out"
                  >
                    −
                  </button>

                  <button
                    onClick={() => setZoom(1)}
                    aria-label="Reset map"
                  >
                    <LocateFixed size={14} />
                  </button>

                </div>

              </div>


              <div className="geo-map-footer">

                <div>
                  <Radio size={14} />
                  Live monitoring network
                </div>

                <span>
                  Last updated: {lastRefresh}
                </span>

              </div>

            </div>


            {/* LOCATION DIRECTORY */}

            <div className="geo-location-card">

              <div className="geo-card-header">

                <div>

                  <span>
                    MONITORED LOCATIONS
                  </span>

                  <h3>
                    Project Directory
                  </h3>

                </div>

                <Building2 size={19} />

              </div>


              <div className="geo-location-list">

                {filteredLocations
                  .slice(
                    0,
                    showAllLocations
                      ? filteredLocations.length
                      : 5
                  )
                  .map((location) => (

                    <button
                      className="geo-location-item"
                      key={location.id}
                      onClick={() =>
                        setSelectedLocation(location)
                      }
                    >

                      <div className="geo-location-icon">
                        <MapPin size={16} />
                      </div>


                      <div className="geo-location-details">

                        <strong>
                          {location.name}
                        </strong>

                        <span>
                          {location.type} •{" "}
                          {location.location}
                        </span>

                        <small>
                          {location.id} • {location.team}
                        </small>

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

                    </button>

                  ))}


                {filteredLocations.length === 0 && (

                  <div className="geo-empty">

                    <Search size={25} />

                    <strong>
                      No locations found
                    </strong>

                    <span>
                      Try another project, location or filter.
                    </span>

                  </div>

                )}

              </div>


              <button
                className="geo-view-all"
                onClick={() =>
                  setShowAllLocations((current) => !current)
                }
              >

                <Eye size={15} />

                {showAllLocations
                  ? "Show Fewer Locations"
                  : `View All Locations (${filteredLocations.length})`}

                <ChevronRight size={15} />

              </button>

            </div>

          </div>


          {/* =================================================
              OPERATION CARDS
          ================================================= */}

          <div className="geo-bottom-grid">


            {/* GEO TAGGED INSPECTIONS */}

            <button
              className="geo-info-card"
              onClick={() => setShowInspections(true)}
            >

              <div className="geo-info-icon">
                <ClipboardCheck size={19} />
              </div>

              <div className="geo-info-content">

                <span>
                  GEO-TAGGED INSPECTIONS
                </span>

                <h3>
                  Location-based verification
                </h3>

                <p>
                  Review inspection activity linked with
                  verified project locations and field
                  verification records.
                </p>

              </div>

              <ChevronRight className="geo-info-arrow" size={18} />

            </button>


            {/* FIELD OPERATIONS */}

            <button
              className="geo-info-card"
              onClick={() => setShowFieldOperations(true)}
            >

              <div className="geo-info-icon">
                <Users size={19} />
              </div>

              <div className="geo-info-content">

                <span>
                  FIELD OPERATIONS
                </span>

                <h3>
                  Inspection team visibility
                </h3>

                <p>
                  Monitor inspection teams, field activity
                  and location-linked operations from the
                  command centre.
                </p>

              </div>

              <ChevronRight className="geo-info-arrow" size={18} />

            </button>

          </div>


        </section>

      </main>


      {/* =====================================================
          GEO-TAGGED INSPECTIONS MODAL
      ===================================================== */}

      {showInspections && (

        <div
          className="geo-modal-overlay"
          onClick={() => setShowInspections(false)}
        >

          <div
            className="geo-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="geo-modal-header">

              <div>

                <span>
                  GEO-TAGGED INSPECTIONS
                </span>

                <h2>
                  Location-based Verification
                </h2>

              </div>

              <button
                onClick={() => setShowInspections(false)}
              >
                ×
              </button>

            </div>


            <div className="geo-modal-list">

              {inspections.map((inspection) => (

                <div
                  className="geo-inspection-item"
                  key={inspection.id}
                >

                  <div className="geo-inspection-icon">
                    <ClipboardCheck size={18} />
                  </div>

                  <div>

                    <strong>
                      {inspection.project}
                    </strong>

                    <span>
                      <MapPin size={12} />
                      {inspection.location}
                    </span>

                    <small>
                      {inspection.id} • {inspection.team} •{" "}
                      {inspection.date}
                    </small>

                  </div>

                  <div
                    className={`inspection-status ${
                      inspection.status.toLowerCase()
                    }`}
                  >
                    {inspection.status}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          FIELD OPERATIONS MODAL
      ===================================================== */}

      {showFieldOperations && (

        <div
          className="geo-modal-overlay"
          onClick={() => setShowFieldOperations(false)}
        >

          <div
            className="geo-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="geo-modal-header">

              <div>

                <span>
                  FIELD OPERATIONS
                </span>

                <h2>
                  Inspection Team Visibility
                </h2>

              </div>

              <button
                onClick={() => setShowFieldOperations(false)}
              >
                ×
              </button>

            </div>


            <div className="geo-modal-list">

              {fieldOperations.map((operation) => (

                <div
                  className="geo-field-item"
                  key={operation.id}
                >

                  <div className="geo-field-icon">
                    <Users size={18} />
                  </div>

                  <div>

                    <strong>
                      {operation.team}
                    </strong>

                    <span>
                      {operation.project}
                    </span>

                    <small>
                      <MapPin size={11} />
                      {operation.location} •{" "}
                      {operation.time}
                    </small>

                  </div>

                  <div
                    className={`field-status ${
                      operation.status === "On Field"
                        ? "on-field"
                        : operation.status === "Completed"
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    {operation.status}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default GeographicMonitoring;