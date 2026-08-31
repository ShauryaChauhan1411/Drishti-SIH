import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  Image,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./InspectionVerification.css";

function InspectionVerification() {
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState("");
  const [verified, setVerified] = useState(false);

  const inspection = {
    id: "INS-2026-002",
    project: "Project Udaan",
    institution: "Udaan Development Centre",
    location: "Gurugram, Haryana",
    inspector: "PMU Team 07",
    inspectionDate: "29 Aug 2026",
    priority: "High",
    evidence: 18,
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const handleSendBack = () => {
    alert("Inspection has been sent back for review.");
  };

  return (
    <div className="verification-page">

      {/* HEADER */}

      <header className="verification-header">

        <div className="verification-header-left">

          <button
            className="verification-back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <span className="verification-kicker">
              GOVERNMENT MONITORING
            </span>

            <h1>Inspection Verification</h1>

            <p>
              Review field evidence and verify submitted inspection records.
            </p>
          </div>

        </div>

        <div className="verification-status">
          <span></span>
          {verified ? "VERIFIED" : "PENDING VERIFICATION"}
        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="verification-content">

        {/* TITLE */}

        <section className="verification-intro">

          <div>
            <span>INSPECTION REVIEW</span>

            <h2>{inspection.id}</h2>

            <p>
              Evidence-based verification of field inspection submission.
            </p>
          </div>

          <div className="priority-high-badge">
            <AlertTriangle size={15} />
            {inspection.priority} Priority
          </div>

        </section>


        {/* BASIC DETAILS */}

        <section className="verification-grid">

          <div className="verification-card">

            <div className="card-heading">
              <ShieldCheck size={19} />
              <div>
                <span>INSPECTION INFORMATION</span>
                <h3>Submission Details</h3>
              </div>
            </div>

            <div className="detail-grid">

              <div className="verification-detail">
                <span>PROJECT</span>
                <strong>{inspection.project}</strong>
              </div>

              <div className="verification-detail">
                <span>INSTITUTION</span>
                <strong>{inspection.institution}</strong>
              </div>

              <div className="verification-detail">
                <span>INSPECTION TEAM</span>
                <strong>{inspection.inspector}</strong>
              </div>

              <div className="verification-detail">
                <span>INSPECTION DATE</span>
                <strong>
                  <Clock3 size={14} />
                  {inspection.inspectionDate}
                </strong>
              </div>

              <div className="verification-detail full">
                <span>LOCATION</span>

                <strong>
                  <MapPin size={15} />
                  {inspection.location}
                </strong>
              </div>

            </div>

          </div>


          {/* EVIDENCE SUMMARY */}

          <div className="evidence-summary-card">

            <div className="evidence-icon">
              <FileCheck2 size={24} />
            </div>

            <span>FIELD EVIDENCE</span>

            <strong>{inspection.evidence}</strong>

            <p>
              Files submitted by the inspection team for verification.
            </p>

            <button className="evidence-button">
              <Image size={16} />
              View Evidence
            </button>

          </div>

        </section>


        {/* EVIDENCE SECTION */}

        <section className="evidence-section">

          <div className="section-heading">

            <div>
              <span>SUBMITTED MATERIAL</span>
              <h2>Inspection Evidence</h2>
            </div>

            <div className="evidence-count">
              {inspection.evidence} Files
            </div>

          </div>


          <div className="evidence-grid">

            {[
              "Site Photograph",
              "Infrastructure Evidence",
              "Project Progress",
              "Field Verification",
              "Institution Premises",
              "Supporting Document",
            ].map((item, index) => (

              <div className="evidence-item" key={index}>

                <div className="evidence-preview">
                  <Image size={30} />
                  <span>Evidence {index + 1}</span>
                </div>

                <div className="evidence-item-info">

                  <strong>{item}</strong>

                  <span>
                    Submitted by {inspection.inspector}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* REMARKS */}

        <section className="remarks-card">

          <div className="section-heading">

            <div>
              <span>OFFICIAL REVIEW</span>
              <h2>Verification Remarks</h2>
            </div>
          </div>

          <textarea
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
            placeholder="Enter verification remarks or observations..."
          />

          <p>
            Add observations before approving or sending the inspection
            submission back for further review.
          </p>

        </section>


        {/* ACTIONS */}

        <section className="verification-actions">

          <button
            className="send-back-button"
            onClick={handleSendBack}
          >
            <AlertTriangle size={17} />
            Send Back for Review
          </button>

          <button
            className="verify-button"
            onClick={handleVerify}
            disabled={verified}
          >
            <CheckCircle2 size={18} />
            {verified ? "Inspection Verified" : "Verify Inspection"}
          </button>

        </section>


        {/* SUCCESS MESSAGE */}

        {verified && (

          <div className="verification-success">

            <CheckCircle2 size={22} />

            <div>
              <strong>Inspection Successfully Verified</strong>

              <p>
                The inspection record has been marked as verified.
              </p>
            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default InspectionVerification;