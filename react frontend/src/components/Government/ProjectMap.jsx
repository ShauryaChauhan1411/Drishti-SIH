import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { getProjects } from "../../services/projectService";
import { getDispatches } from "../../services/dispatchService";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const lowRiskIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;background:#22c55e;border:3px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -9]
});

const mediumRiskIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;background:#facc15;border:3px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -9]
});

const highRiskIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;background:#f97316;border:3px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -9]
});

const criticalRiskIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;background:#ef4444;border:3px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -9]
});

function getRiskIcon(riskCategory) {
  switch (riskCategory) {
    case "Low":
      return lowRiskIcon;

    case "Medium":
      return mediumRiskIcon;

    case "High":
      return highRiskIcon;

    case "Critical":
      return criticalRiskIcon;

    default:
      return mediumRiskIcon;
  }
}

function ProjectMap() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dispatches, setDispatches] = useState([]);
     const [riskFilter, setRiskFilter] = useState("All");
     const [districtFilter, setDistrictFilter] = useState("All");
     const [searchTerm, setSearchTerm] = useState("");

  const loadProjects = () => {
  setLoading(true);
  setError("");

  Promise.all([getProjects(), getDispatches()])
  .then(([projectData, dispatchData]) => {
    setProjects(projectData);
    setDispatches(dispatchData);
    console.log("Dispatch data from Firestore:", dispatchData);
    setLoading(false);
  })
    .catch((err) => {
      console.error("Failed to load projects:", err);
      setError("Unable to load projects.");
      setLoading(false);
    });
};

useEffect(() => {
  loadProjects();
}, []);

  const districts = [
  ...new Set(projects.map((project) => project.district))
];

const getDispatchForProject = (projectId) => {
  return dispatches.find(
    (dispatch) => dispatch.project_id === projectId
  );
};

const filteredProjects = projects.filter((project) => {
  const matchesRisk =
    riskFilter === "All" ||
    project.risk_category === riskFilter;

  const matchesDistrict =
    districtFilter === "All" ||
    project.district === districtFilter;

  const search = searchTerm.toLowerCase();

const matchesSearch =
  String(project.project_id || "").toLowerCase().includes(search) ||
  String(project.scheme || "").toLowerCase().includes(search) ||
  String(project.district || "").toLowerCase().includes(search);

  return matchesRisk && matchesDistrict && matchesSearch;
});
 return (
  <>
  {loading && (
  <div style={{ marginBottom: "10px", fontSize: "14px" }}>
    Loading projects...
  </div>
)}
{error && (
  <div style={{ marginBottom: "10px", fontSize: "14px", color: "red" }}>
    {error}
  </div>
)}
   <div
  style={{
    marginBottom: "10px",
    position: "relative",
    zIndex: 1000,
    backgroundColor: "white",
    padding: "8px"
  }}
>
        <button
  onClick={loadProjects}
  disabled={loading}
  style={{
    marginBottom: "10px",
    padding: "6px 12px",
    cursor: loading ? "not-allowed" : "pointer"
  }}
>
  {loading ? "Refreshing..." : "Refresh Projects"}
</button>
        <label>
  Search Project:{" "}
  <input
    type="text"
   placeholder="Search ID, scheme or district"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</label>
{" "}
      <label>
        Risk:{" "}
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Critical">Critical</option>
        </select>
        {" "}
<label>
  District:{" "}
  <select
    value={districtFilter}
    onChange={(e) => setDistrictFilter(e.target.value)}
  >
    <option value="All">All</option>

    {districts.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
  </select>
</label>
<div style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
  Showing {filteredProjects.length} of {projects.length} projects
</div>
      </label>
    </div>

<div
  style={{
    marginBottom: "10px",
    display: "flex",
    gap: "15px",
    fontSize: "14px"
  }}
>
  <span>🟢 Low</span>
  <span>🟡 Medium</span>
  <span>🔴 Critical</span>
</div>
   <MapContainer
  center={[28.6139, 77.2090]}
  zoom={11}
  scrollWheelZoom={false}
  dragging={true}
  style={{ height: "500px", width: "100%" }}
>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {filteredProjects.map((project) => (
       <Marker
  key={project.project_id}
  position={[project.latitude, project.longitude]}
  icon={getRiskIcon(project.risk_category)}
>
          <Popup>
  <strong>{project.project_id}</strong>
  <br />
  Scheme: {project.scheme}
  <br />
  District: {project.district}
  <br />
  Risk: {project.risk_category}
  <br />
  Risk Score: {project.risk_score}
  <br />
  Beneficiaries: {project.beneficiary_count}
  <br />
  Fund Allocated: ₹{project.fund_allocated_lakhs} L
  <br />
  Fund Utilized: ₹{project.fund_utilized_lakhs} L
  <br />
  Inspections: {project.inspection_count}
  <br />
  Flagged for Audit: {project.flagged_for_audit === 1 ? "Yes" : "No"}
  <br />
PMU Team: {getDispatchForProject(project.project_id)?.assigned_team_name || "Not Assigned"}
<br />
Team Lead: {getDispatchForProject(project.project_id)?.team_lead || "Not Assigned"}
<br />
Match Quality: {getDispatchForProject(project.project_id)?.match_quality_score
  ? `${(getDispatchForProject(project.project_id).match_quality_score * 100).toFixed(1)}%`
  : "N/A"}

</Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
}

export default ProjectMap;