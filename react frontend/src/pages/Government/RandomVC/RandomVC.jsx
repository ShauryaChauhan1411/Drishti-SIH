import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Monitor,
  Mic,
  PhoneCall,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  Video,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./RandomVC.css";

const vcRecords = [
  {
    id: "VC-001",
    project: "Project Asha",
    type: "Project Incharge",
    person: "Rajiv Sharma",
    location: "New Delhi",
    status: "Available",
    lastConnected: "Today, 11:42 AM",
  },
  {
    id: "VC-002",
    project: "Saksham Centre",
    type: "Staff",
    person: "Neha Verma",
    location: "Jaipur",
    status: "Available",
    lastConnected: "Today, 10:18 AM",
  },
  {
    id: "VC-003",
    project: "Udaan Support Centre",
    type: "Beneficiary",
    person: "Verified Beneficiary",
    location: "Lucknow",
    status: "Offline",
    lastConnected: "Yesterday, 4:25 PM",
  },
  {
    id: "VC-004",
    project: "Nayi Disha Institute",
    type: "Project Incharge",
    person: "Amit Kumar",
    location: "Bhopal",
    status: "Available",
    lastConnected: "Today, 09:52 AM",
  },
  {
    id: "VC-005",
    project: "Samarth Foundation",
    type: "Staff",
    person: "Priya Singh",
    location: "Patna",
    status: "Offline",
    lastConnected: "Yesterday, 2:40 PM",
  },
];

function RandomVC() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
 const [selectedRecord, setSelectedRecord] = useState(null);
const [isSelecting, setIsSelecting] = useState(false);
const [message, setMessage] = useState("");
const [inCall, setInCall] = useState(false);
const [micOn, setMicOn] = useState(true);
const [cameraOn, setCameraOn] = useState(true);

  const availableRecords = vcRecords.filter(
    (record) => record.status === "Available"
  );

  const filteredRecords = vcRecords.filter((record) => {
    const search = searchTerm.toLowerCase();

    return (
      record.project.toLowerCase().includes(search) ||
      record.person.toLowerCase().includes(search) ||
      record.location.toLowerCase().includes(search) ||
      record.type.toLowerCase().includes(search)
    );
  });

  const handleRandomSelection = () => {
    if (availableRecords.length === 0) {
      setMessage("No available VC connection found.");
      return;
    }

    setIsSelecting(true);
    setMessage("");

    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * availableRecords.length
      );

      setSelectedRecord(availableRecords[randomIndex]);
      setIsSelecting(false);
      setMessage("Random VC connection selected.");
    }, 700);
  };

  const handleStartVC = (record) => {
    console.log("VC STATUS:", record.status);
console.log("VC RECORD:", record);

  if (record.status !== "Available") {
    setMessage("This VC connection is currently unavailable.");
    return;
  }

  setSelectedRecord(record);
  setMessage("");
  setInCall(true);
};

  return (
    <div className="random-vc-page">
      {inCall && selectedRecord && (
  <div className="vc-call-overlay">
    <div className="vc-call-header">
      <div>
        <span>SECURE VIDEO CONNECTION</span>
        <h2>{selectedRecord.project}</h2>
      </div>

      <div className="vc-live-status">
        <span></span>
        LIVE CONNECTION
      </div>
    </div>

    <div className="vc-call-content">
      <div className="vc-video-area">
        <div className="vc-video-placeholder">
          <Video size={52} />
          <h3>{selectedRecord.person}</h3>
          <p>{selectedRecord.type}</p>
          <span>{selectedRecord.location}</span>
        </div>

        <div className="vc-self-preview">
          <Monitor size={24} />
          <span>Government Officer</span>
        </div>
      </div>

      <div className="vc-call-info">
        <div>
          <span>CONNECTED TO</span>
          <strong>{selectedRecord.project}</strong>
        </div>

        <div>
          <span>STAKEHOLDER</span>
          <strong>{selectedRecord.person}</strong>
        </div>

        <div>
          <span>LOCATION</span>
          <strong>{selectedRecord.location}</strong>
        </div>

        <div>
          <span>CONNECTION STATUS</span>
          <strong className="connected-text">Connected</strong>
        </div>
      </div>
    </div>

    <div className="vc-call-controls">
     <button
  title={micOn ? "Mute microphone" : "Unmute microphone"}
  onClick={() => setMicOn(!micOn)}
  className={!micOn ? "control-off" : ""}
>
 <Mic size={19} />
</button>

<button
  title={cameraOn ? "Turn camera off" : "Turn camera on"}
  onClick={() => setCameraOn(!cameraOn)}
  className={!cameraOn ? "control-off" : ""}
>
  <Video size={19} />
</button>

      <button
        className="end-call-button"
        onClick={() => {
          setInCall(false);
          setMessage("VC session ended.");
        }}
      >
        <XCircle size={19} />
        End Call
      </button>
    </div>
  </div>
)}

      {/* TOP HEADER */}

      <header className="random-vc-header">

        <div className="random-vc-header-left">

          <button
            className="back-button"
            onClick={() => navigate("/government/dashboard")}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="header-title-icon">
            <Video size={22} />
          </div>

          <div>
            <span>DEPARTMENT MONITORING</span>
            <h1>Random Video Conferencing</h1>
          </div>

        </div>

        <div className="header-status">
          <span></span>
          SYSTEM LIVE
        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="random-vc-content">

        {/* INTRO */}

        <section className="vc-introduction">

          <div>
            <span className="page-kicker">
              RANDOM VC CONNECTIVITY
            </span>

            <h2>
              Connect with monitored
              <strong> projects & stakeholders</strong>
            </h2>

            <p>
              Establish random video conferencing connections with
              project in-charges, staff and beneficiaries for real-time
              monitoring and verification.
            </p>
          </div>

          <button
            className="random-select-button"
            onClick={handleRandomSelection}
            disabled={isSelecting}
          >
            <RefreshCw
              size={18}
              className={isSelecting ? "rotating" : ""}
            />

            {isSelecting
              ? "Selecting..."
              : "Select Random Connection"}
          </button>

        </section>


        {/* MESSAGE */}

        {message && (
          <div className="vc-message">
            <CheckCircle2 size={17} />
            {message}
          </div>
        )}


        {/* STATISTICS */}

        <section className="vc-stats">

          <div className="vc-stat-card">
            <div className="vc-stat-icon blue">
              <Monitor size={20} />
            </div>

            <div>
              <span>Monitored Connections</span>
              <strong>05</strong>
            </div>
          </div>

          <div className="vc-stat-card">
            <div className="vc-stat-icon green">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Available Now</span>
              <strong>03</strong>
            </div>
          </div>

          <div className="vc-stat-card">
            <div className="vc-stat-icon amber">
              <Activity size={20} />
            </div>

            <div>
              <span>VC Sessions Today</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="vc-stat-card">
            <div className="vc-stat-icon purple">
              <Users size={20} />
            </div>

            <div>
              <span>Stakeholder Types</span>
              <strong>03</strong>
            </div>
          </div>

        </section>


        {/* RANDOMLY SELECTED CONNECTION */}

        {selectedRecord && (
          <section className="selected-vc-card">

            <div className="selected-vc-info">

              <div className="selected-icon">
                <Video size={23} />
              </div>

              <div>
                <span>SELECTED CONNECTION</span>

                <h3>
                  {selectedRecord.project}
                </h3>

                <p>
                  {selectedRecord.type} •{" "}
                  {selectedRecord.person}
                </p>
              </div>

            </div>

            <button
              className="start-vc-button"
              onClick={() => handleStartVC(selectedRecord)}
            >
              <PhoneCall size={17} />
              Start VC
            </button>

          </section>
        )}


        {/* CONNECTION TABLE */}

        <section className="vc-table-card">

          <div className="table-header">

            <div>
              <span>MONITORED STAKEHOLDERS</span>
              <h3>VC Connectivity</h3>
            </div>

            <div className="search-box">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search project, person or location"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>

          </div>


          <div className="vc-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>PROJECT / INSTITUTE</th>
                  <th>STAKEHOLDER</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>LAST CONNECTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.map((record) => (

                  <tr key={record.id}>

                    <td>
                      <div className="project-cell">
                        <div className="project-icon">
                          <ShieldCheck size={16} />
                        </div>

                        <div>
                          <strong>{record.project}</strong>
                          <span>{record.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="stakeholder-cell">
                        <strong>{record.person}</strong>
                        <span>{record.type}</span>
                      </div>
                    </td>

                    <td>
                      <div className="location-cell">
                        <MapPin size={14} />
                        {record.location}
                      </div>
                    </td>

                    <td>

                      {record.status === "Available" ? (
                        <span className="status-badge available">
                          <CheckCircle2 size={13} />
                          Available
                        </span>
                      ) : (
                        <span className="status-badge offline">
                          <XCircle size={13} />
                          Offline
                        </span>
                      )}

                    </td>

                    <td>
                      <div className="last-connection">
                        <Clock3 size={14} />
                        {record.lastConnected}
                      </div>
                    </td>

                    <td>

                      <button
                        className="connect-button"
                        disabled={record.status !== "Available"}
                        onClick={() => handleStartVC(record)}
                      >
                        <Video size={15} />

                        {record.status === "Available"
                          ? "Connect"
                          : "Unavailable"}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* SECURITY NOTE */}

        <div className="vc-security">

          <ShieldCheck size={18} />

          <div>
            <strong>Controlled Government Connectivity</strong>

            <span>
              Video conferencing is intended for authorised
              monitoring and verification activities under the
              DoSJE monitoring framework.
            </span>
          </div>

        </div>

      </main>

    </div>
  );
}

export default RandomVC;