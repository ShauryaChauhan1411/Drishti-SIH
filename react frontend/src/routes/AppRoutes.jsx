import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import GovernmentLogin
  from "../pages/Government/GovernmentLogin";

import GovernmentLayout
  from "../components/Government/GovernmentLayout";

import GovernmentDashboard
  from "../pages/Government/GovernmentDashboard";

import CCTVMonitoring
  from "../pages/Government/CCTV/CCTVMonitoring";

import RandomVC
  from "../pages/Government/RandomVC/RandomVC";

import Inspections
  from "../pages/Government/Inspections/Inspections";

import InspectionVerification
  from "../pages/Government/Inspections/InspectionVerification";

import AIAssignment
  from "../pages/Government/AIAssignment/AIAssignment";

import GeographicMonitoring
  from "../pages/Government/Geographic/GeographicMonitoring";

import BeneficiaryAnalytics
  from "../pages/Government/Beneficiary/BeneficiaryAnalytics";


function AppRoutes() {
  return (
    <Routes>

      {/* ================================
          HOME
      ================================= */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* ================================
          GOVERNMENT LOGIN
      ================================= */}

      <Route
        path="/government/login"
        element={<GovernmentLogin />}
      />


      {/* ================================
          GOVERNMENT LAYOUT

          Topbar + Sidebar remain fixed.
          Only the page inside Outlet changes.
      ================================= */}

      <Route
        path="/government/dashboard"
        element={<GovernmentLayout />}
      >

        {/* DASHBOARD / OVERVIEW */}

        <Route
          index
          element={<GovernmentDashboard />}
        />


        {/* CCTV */}

        <Route
          path="cctv"
          element={<CCTVMonitoring />}
        />


        {/* RANDOM VC */}

        <Route
          path="random-vc"
          element={<RandomVC />}
        />


        {/* INSPECTIONS */}

        <Route
          path="inspections"
          element={<Inspections />}
        />


        {/* INSPECTION VERIFICATION */}

        <Route
          path="inspections/verification"
          element={<InspectionVerification />}
        />


        {/* AI INSPECTION ENGINE */}

        <Route
          path="ai-assignment"
          element={<AIAssignment />}
        />


        {/* GEOGRAPHIC MONITORING */}

        <Route
          path="geographic"
          element={<GeographicMonitoring />}
        />


        {/* BENEFICIARY ANALYTICS */}

        <Route
          path="beneficiary"
          element={<BeneficiaryAnalytics />}
        />

      </Route>


      {/* ================================
          INVALID URL
      ================================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;