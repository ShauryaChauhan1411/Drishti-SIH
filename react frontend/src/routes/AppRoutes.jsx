import { Navigate, Route, Routes } from "react-router-dom";

// 1. Home landing page
import Home from "../pages/Home/Home";

// 2. Authentication components
import Login from "../components/login";
import ProtectedRoute from "../components/ProtectedRoute";

// 3. Government Layout & Dashboard Pages
import GovernmentLayout from "../components/Government/GovernmentLayout";
import GovernmentDashboard from "../pages/Government/GovernmentDashboard";
import CCTVMonitoring from "../pages/Government/CCTV/CCTVMonitoring";
import RandomVC from "../pages/Government/RandomVC/RandomVC";
import Inspections from "../pages/Government/Inspections/Inspections";
import InspectionVerification from "../pages/Government/Inspections/InspectionVerification";
import AIAssignment from "../pages/Government/AIAssignment/AIAssignment";
import GeographicMonitoring from "../pages/Government/Geographic/GeographicMonitoring";
import BeneficiaryAnalytics from "../pages/Government/Beneficiary/BeneficiaryAnalytics";

function AppRoutes() {
  return (
    <Routes>
      {/* ================================
          1. FIRST SCREEN: HOME PAGE
      ================================= */}
      <Route path="/" element={<Home />} />

      {/* ================================
          2. SECOND SCREEN: LOGIN PAGE
      ================================= */}
      <Route path="/government/login" element={<Login />} />

      {/* ================================
          3. PROTECTED COMMAND CENTRE
          Accessible ONLY after login
      ================================= */}
      <Route
        path="/government/dashboard"
        element={
          <ProtectedRoute>
            <GovernmentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<GovernmentDashboard />} />
        <Route path="cctv" element={<CCTVMonitoring />} />
        <Route path="random-vc" element={<RandomVC />} />
        <Route path="inspections" element={<Inspections />} />
        <Route path="inspections/verification" element={<InspectionVerification />} />
        <Route path="ai-assignment" element={<AIAssignment />} />
        <Route path="geographic" element={<GeographicMonitoring />} />
        <Route path="beneficiary" element={<BeneficiaryAnalytics />} />
      </Route>

      {/* ================================
          FALLBACK FOR UNKNOWN ROUTES
      ================================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;