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

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={11}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {projects.map((project) => (
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
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ProjectMap;