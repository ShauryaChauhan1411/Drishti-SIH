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
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./InspectionVerification.css";

function InspectionVerification() {
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState("");
  const [verified, setVerified] = useState(false);
  const [sentBack, setSentBack] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

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

  const evidenceItems = [
    "Site Photograph",
    "Infrastructure Evidence",
    "Project Progress",
    "Field Verification",
    "Institution Premises",
    "Supporting Document",
  ];

  /* VERIFY INSPECTION */

  const handleVerify = () => {
    if (!remarks.trim()) {
      alert("Please enter verification remarks before verifying the inspection.");
      return;
    }

    setVerified(true);
    setSentBack(false);
    alert("Inspection has been successfully verified.");
  };

  /* SEND BACK */

  const handleSendBack = () => {
    if (!remarks.trim()) {
      alert("Please enter remarks explaining why the inspection is being sent back.");
      return;
    }

    setSentBack(true);
    setVerified(false);
    alert("Inspection has been sent back for review.");
  };

  /* VIEW EVIDENCE */

  const handleViewEvidence = () => {
    setShowAllEvidence(true);

    setTimeout(() => {
      document
        .getElementById("inspection-evidence")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
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

        <div
          className={`verification-status ${
            verified
              ? "verification-status-verified"
              : sentBack
              ? "verification-status-sent"
              : ""
          }`}
        >
          <span></span>

          {verified
            ? "VERIFIED"
            : sentBack
            ? "SENT BACK"
            : "PENDING VERIFICATION"}
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

            <button
              className="evidence-button"
              onClick={handleViewEvidence}
            >
              <Image size={16} />
              View Evidence
            </button>

          </div>

        </section>


        {/* EVIDENCE SECTION */}

        <section
          className="evidence-section"
          id="inspection-evidence"
        >

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

            {evidenceItems.map((item, index) => (

              <div
                className={`evidence-item ${
                  selectedEvidence === index
                    ? "evidence-item-selected"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedEvidence(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSelectedEvidence(index);
                  }
                }}
              >

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


          {/* SELECTED EVIDENCE */}

          {selectedEvidence !== null && (

            <div className="selected-evidence-panel">

              <div>
                <span>SELECTED EVIDENCE</span>

                <h3>
                  {evidenceItems[selectedEvidence]}
                </h3>

                <p>
                  Evidence {selectedEvidence + 1} submitted by{" "}
                  {inspection.inspector}.
                </p>
              </div>

              <button
                className="secondary-modal-button"
                onClick={() => setSelectedEvidence(null)}
              >
                Close
              </button>

            </div>

          )}

        </section>


        {/* SHOW ALL EVIDENCE STATUS */}

        {showAllEvidence && (

          <div className="evidence-view-notice">

            <CheckCircle2 size={18} />

            <span>
              All submitted inspection evidence is now available
              for review above.
            </span>

          </div>

        )}


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
            disabled={verified}
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
            disabled={verified}
          >
            <AlertTriangle size={17} />

            {sentBack
              ? "Sent Back for Review"
              : "Send Back for Review"}
          </button>


          <button
            className="verify-button"
            onClick={handleVerify}
            disabled={verified}
          >
            <CheckCircle2 size={18} />

            {verified
              ? "Inspection Verified"
              : "Verify Inspection"}
          </button>

        </section>


        {/* SUCCESS MESSAGE */}

        {verified && (

          <div className="verification-success">

            <CheckCircle2 size={22} />

            <div>
              <strong>
                Inspection Successfully Verified
              </strong>

              <p>
                The inspection record has been marked as verified.
              </p>
            </div>

          </div>

        )}


        {/* SEND BACK MESSAGE */}

        {sentBack && (

          <div className="verification-success verification-sent-message">

            <AlertTriangle size={22} />

            <div>
              <strong>
                Inspection Sent Back for Review
              </strong>

              <p>
                The inspection record requires further review by
                the inspection team.
              </p>
            </div>

          </div>

        )}

      </main>


      {/* EVIDENCE MODAL */}

      {selectedEvidence !== null && (

        <div
          className="inspection-modal-overlay"
          onClick={() => setSelectedEvidence(null)}
        >

          <div
            className="inspection-modal evidence-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span>FIELD EVIDENCE</span>

                <h2>
                  {evidenceItems[selectedEvidence]}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedEvidence(null)}
              >
                <XCircle size={20} />
              </button>

            </div>


            <div className="evidence-modal-preview">

              <Image size={55} />

              <strong>
                Evidence {selectedEvidence + 1}
              </strong>

              <span>
                {evidenceItems[selectedEvidence]}
              </span>

              <small>
                Submitted by {inspection.inspector}
              </small>

            </div>


            <div className="modal-actions">

              <button
                className="secondary-modal-button"
                onClick={() => setSelectedEvidence(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default InspectionVerification;