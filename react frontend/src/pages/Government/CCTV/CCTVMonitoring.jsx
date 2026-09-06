import {
  ArrowLeft,
  Camera,
  Circle,
  Maximize2,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Video,
  Wifi,
  AlertTriangle,
  Activity,
  X,
  Brain,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CCTVMonitoring.css";

const initialCameraFeeds = [
  {
    id: "CCTV-001",
    project: "Project Monitoring Unit — Delhi",
    location: "New Delhi",
    status: "LIVE",
    lastUpdate: "Live",
    uptime: "99.8%",
    aiStatus: "Normal",
    anomaly: false,
  },
  {
    id: "CCTV-002",
    project: "Institution Monitoring Centre",
    location: "Haryana",
    status: "LIVE",
    lastUpdate: "Live",
    uptime: "98.7%",
    aiStatus: "Normal",
    anomaly: false,
  },
  {
    id: "CCTV-003",
    project: "Scheme Implementation Centre",
    location: "Uttar Pradesh",
    status: "LIVE",
    lastUpdate: "Live",
    uptime: "97.9%",
    aiStatus: "Attention",
    anomaly: true,
  },
  {
    id: "CCTV-004",
    project: "District Monitoring Centre",
    location: "Rajasthan",
    status: "OFFLINE",
    lastUpdate: "8 min ago",
    uptime: "91.2%",
    aiStatus: "Offline",
    anomaly: false,
  },
  {
    id: "CCTV-005",
    project: "Social Welfare Institute",
    location: "Punjab",
    status: "LIVE",
    lastUpdate: "Live",
    uptime: "99.1%",
    aiStatus: "Normal",
    anomaly: false,
  },
  {
    id: "CCTV-006",
    project: "Beneficiary Support Centre",
    location: "Madhya Pradesh",
    status: "LIVE",
    lastUpdate: "Live",
    uptime: "96.8%",
    aiStatus: "Normal",
    anomaly: false,
  },
];

function CCTVMonitoring() {
  const navigate = useNavigate();

  const [cameraFeeds, setCameraFeeds] = useState(initialCameraFeeds);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  /* =========================================
     REFRESH CCTV STATUS
  ========================================= */

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setCameraFeeds((currentFeeds) =>
        currentFeeds.map((camera) => ({
          ...camera,
          lastUpdate:
            camera.status === "LIVE"
              ? "Live"
              : `${Math.floor(Math.random() * 10) + 1} min ago`,
        }))
      );

      setLastRefresh(new Date());
      setRefreshing(false);
    }, 900);
  };

  /* =========================================
     FILTER CAMERAS
  ========================================= */

  const filteredCameras = useMemo(() => {
    return cameraFeeds.filter((camera) => {
      const matchesSearch =
        camera.project
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        camera.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        camera.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        camera.status === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [cameraFeeds, searchTerm, statusFilter]);

  /* =========================================
     LIVE CLOCK / AUTO UPDATE
  ========================================= */

  useEffect(() => {
  const loadCameras = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/cctv");

      if (!response.ok) {
        throw new Error("Failed to fetch CCTV data");
      }

      const data = await response.json();

      setCameraFeeds(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Failed to load CCTV data:", error);
    }
  };

  loadCameras();

  const interval = setInterval(() => {
    loadCameras();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const liveFeeds = cameraFeeds.filter(
    (camera) => camera.status === "LIVE"
  ).length;

  const offlineFeeds = cameraFeeds.filter(
    (camera) => camera.status === "OFFLINE"
  ).length;

  const anomalyCount = cameraFeeds.filter(
    (camera) => camera.anomaly
  ).length;

  return (
    <div className="cctv-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="cctv-header">

        <div className="cctv-header-left">

          <button
            className="cctv-back-button"
            onClick={() => navigate("/government/dashboard")}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div>

            <div className="cctv-breadcrumb">
              GOVERNMENT COMMAND CENTRE
            </div>

            <h1>Live CCTV Monitoring</h1>

            <p>
              Real-time surveillance across monitored projects,
              institutes and implementation centres
            </p>

          </div>

        </div>

        <div className="cctv-header-right">

          <div className="cctv-system-status">
            <span></span>
            SURVEILLANCE SYSTEM ONLINE
          </div>

          <button
            className="cctv-refresh-button"
            onClick={handleRefresh}
          >
            <RefreshCw
              size={16}
              className={refreshing ? "refresh-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

        </div>

      </header>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="cctv-content">

        {/* =========================================
            SUMMARY CARDS
        ========================================= */}

        <section className="cctv-summary">

          <div className="cctv-summary-card">

            <div className="summary-icon">
              <Video size={20} />
            </div>

            <div>
              <span>CONNECTED FEEDS</span>

              <strong>
                {cameraFeeds.length}
              </strong>

              <small>
                Registered surveillance connections
              </small>
            </div>

          </div>


          <div className="cctv-summary-card">

            <div className="summary-icon live">
              <Wifi size={20} />
            </div>

            <div>
              <span>LIVE FEEDS</span>

              <strong>
                {liveFeeds}
              </strong>

              <small>
                Currently transmitting
              </small>
            </div>

          </div>


          <div className="cctv-summary-card">

            <div className="summary-icon warning">
              <Circle size={20} />
            </div>

            <div>
              <span>OFFLINE FEEDS</span>

              <strong>
                {offlineFeeds}
              </strong>

              <small>
                Require connectivity review
              </small>
            </div>

          </div>


          <div className="cctv-summary-card">

            <div className="summary-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <span>SURVEILLANCE HEALTH</span>

             <strong>
  {cameraFeeds.length > 0
    ? `${(
        cameraFeeds.reduce((total, camera) => total + camera.uptime, 0) /
        cameraFeeds.length
      ).toFixed(1)}%`
    : "0%"}
</strong>

              <small>
                Overall network availability
              </small>
            </div>

          </div>

        </section>


        {/* =========================================
            AI MONITORING BAR
        ========================================= */}

        <section className="cctv-ai-bar">

          <div className="cctv-ai-icon">
            <Brain size={22} />
          </div>

          <div className="cctv-ai-content">

            <strong>
              AI Surveillance Analytics
            </strong>

            <span>
              Continuous monitoring for camera health,
              unusual activity and surveillance anomalies.
            </span>

          </div>

          <div className="cctv-ai-status">
            <Activity size={15} />
            AI ENGINE ACTIVE
          </div>

          <div className="cctv-anomaly-count">
            <AlertTriangle size={15} />
            {anomalyCount} anomaly flagged
          </div>

        </section>


        {/* =========================================
            TOOLBAR
        ========================================= */}

        <section className="cctv-toolbar">

          <div className="cctv-toolbar-title">

            <span>MONITORED LOCATIONS</span>

            <h2>
              Surveillance Feeds
            </h2>

            <small className="cctv-refresh-time">
              Last updated:{" "}
              {lastRefresh.toLocaleTimeString()}
            </small>

          </div>


          <div className="cctv-toolbar-actions">

            <div className="cctv-search">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search project, location or CCTV ID..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>


            <select
              className="cctv-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option>All Status</option>
              <option>LIVE</option>
              <option>OFFLINE</option>

            </select>

          </div>

        </section>


        {/* =========================================
            CAMERA GRID
        ========================================= */}

        {filteredCameras.length > 0 ? (

          <section className="cctv-grid">

            {filteredCameras.map((camera) => (

              <article
                className={`camera-card ${
                  camera.status === "OFFLINE"
                    ? "camera-offline"
                    : ""
                }`}
                key={camera.id}
              >

                {/* CAMERA VIEW */}

                <div className="camera-view">

                  <div className="camera-top">

                    <span className="camera-id">
                      {camera.id}
                    </span>

                    <span
                      className={`camera-status ${
                        camera.status === "LIVE"
                          ? "status-live"
                          : "status-offline"
                      }`}
                    >

                      <span></span>

                      {camera.status}

                    </span>

                  </div>


                  {camera.status === "LIVE" ? (

                    <div className="live-camera-placeholder">

                      <Camera size={36} />

                      <strong>
                        LIVE CCTV FEED
                      </strong>

                      <span>
                        Secure surveillance stream
                      </span>

                      <div className="stream-indicator">

                        <Circle
                          size={8}
                          fill="currentColor"
                        />

                        STREAM ACTIVE

                      </div>

                    </div>

                  ) : (

                    <div className="offline-camera">

                      <Camera size={34} />

                      <strong>
                        Camera Offline
                      </strong>

                      <span>
                        Last connection:{" "}
                        {camera.lastUpdate}
                      </span>

                    </div>

                  )}


                  {/* AI BADGE */}

                  <div
                    className={`camera-ai-badge ${
                      camera.anomaly
                        ? "ai-warning"
                        : ""
                    }`}
                  >

                    <Brain size={12} />

                    {camera.anomaly
                      ? "AI ATTENTION"
                      : "AI NORMAL"}

                  </div>


                  {/* FULLSCREEN */}

                  <button
                    className="fullscreen-button"
                    title="Open surveillance view"
                    onClick={() =>
                      setSelectedCamera(camera)
                    }
                  >

                    <Maximize2 size={16} />

                  </button>

                </div>


                {/* CAMERA INFORMATION */}

                <div className="camera-information">

                  <div>

                    <span className="camera-location-label">
                      PROJECT / INSTITUTION
                    </span>

                    <h3>
                      {camera.project}
                    </h3>

                  </div>


                  <div className="camera-location">

                    <MapPin size={14} />

                    <span>
                      {camera.location}
                    </span>

                  </div>


                  {/* CAMERA METRICS */}

                  <div className="camera-metrics">

                    <div>
                      <span>UPTIME</span>
                      <strong>
                        {camera.uptime}
                      </strong>
                    </div>

                    <div>
                      <span>AI STATUS</span>

                      <strong
                        className={
                          camera.anomaly
                            ? "metric-warning"
                            : ""
                        }
                      >
                        {camera.aiStatus}
                      </strong>

                    </div>

                  </div>


                  <div className="camera-footer">

                    <span>
                      Feed ID: {camera.id}
                    </span>

                    <span>
                      {camera.status === "LIVE"
                        ? "Receiving data"
                        : "Connection unavailable"}
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </section>

        ) : (

          /* EMPTY STATE */

          <div className="cctv-empty-state">

            <Search size={35} />

            <h3>
              No surveillance feeds found
            </h3>

            <p>
              Try another project name, location or
              surveillance status.
            </p>

          </div>

        )}


        {/* =========================================
            INFORMATION PANEL
        ========================================= */}

        <section className="cctv-information">

          <div className="information-icon">
            <ShieldCheck size={19} />
          </div>

          <div>

            <strong>
              Secure Surveillance Infrastructure
            </strong>

            <p>
              CCTV feeds displayed here represent
              authorized surveillance connections from
              monitored projects and institutions.
              AI-assisted analytics can flag camera
              health issues and unusual monitoring
              patterns for departmental review.
            </p>

          </div>

        </section>

      </main>


      {/* =========================================
          CAMERA MODAL
      ========================================= */}

      {selectedCamera && (

        <div
          className="cctv-modal-overlay"
          onClick={() =>
            setSelectedCamera(null)
          }
        >

          <div
            className="cctv-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cctv-modal-header">

              <div>

                <span>
                  {selectedCamera.id}
                </span>

                <h2>
                  {selectedCamera.project}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedCamera(null)
                }
                className="cctv-modal-close"
              >
                <X size={20} />
              </button>

            </div>


            <div className="cctv-modal-screen">

              {selectedCamera.status === "LIVE" ? (

                <>
                  <Camera size={55} />

                  <strong>
                    LIVE SURVEILLANCE STREAM
                  </strong>

                  <span>
                    Secure camera connection active
                  </span>

                  <div className="modal-live-indicator">
                    <Circle
                      size={9}
                      fill="currentColor"
                    />
                    LIVE
                  </div>
                </>

              ) : (

                <>
                  <Camera size={55} />

                  <strong>
                    CAMERA OFFLINE
                  </strong>

                  <span>
                    Last connection:{" "}
                    {selectedCamera.lastUpdate}
                  </span>
                </>

              )}

            </div>


            <div className="cctv-modal-details">

              <div>
                <span>LOCATION</span>
                <strong>
                  {selectedCamera.location}
                </strong>
              </div>

              <div>
                <span>UPTIME</span>
                <strong>
                  {selectedCamera.uptime}
                </strong>
              </div>

              <div>
                <span>AI STATUS</span>
                <strong>
                  {selectedCamera.aiStatus}
                </strong>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default CCTVMonitoring;