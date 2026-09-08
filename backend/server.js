const express = require("express");
const cors = require("cors");
const { PythonShell } = require("python-shell");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const app = express();

app.use(cors());
app.use(express.json());

// Firebase Admin initialization
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Drishti-SIH backend is running",
  });
});

app.get("/api/projects", async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error: "Failed to fetch projects",
    });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
  return res.status(400).json({
    error: "Project ID is required",
  });
}

    const projectRef = db.collection("projects").doc(id);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    res.json({
      id: projectDoc.id,
      ...projectDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching project:", error);

    res.status(500).json({
      error: "Failed to fetch project",
    });
  }
});

app.get("/api/pmu-teams", async (req, res) => {
  try {
    const snapshot = await db.collection("pmu_teams").get();

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(teams);
  } catch (error) {
    console.error("Error fetching PMU teams:", error);
    res.status(500).json({
      error: "Failed to fetch PMU teams",
    });
  }
});

app.get("/api/dispatch", async (req, res) => {
  try {
    const snapshot = await db.collection("pmu_dispatch").get();

    const dispatch = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(dispatch);
  } catch (error) {
    console.error("Error fetching dispatch data:", error);
    res.status(500).json({
      error: "Failed to fetch dispatch data",
    });
  }
});

app.get("/api/cctv", async (req, res) => {
  try {
    const snapshot = await db.collection("cctv_cameras").get();

    const cameras = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(cameras);
  } catch (error) {
    console.error("Error fetching CCTV data:", error);

    res.status(500).json({
      error: "Failed to fetch CCTV data",
    });
  }
});

app.get("/api/inspections", async (req, res) => {
  try {
   const snapshot = await db.collection("inspections").get();
 console.log("INSPECTION COUNT:", snapshot.size);

    const inspections = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(inspections);
  } catch (error) {
    console.error("Error fetching inspections:", error);

    res.status(500).json({
      error: "Failed to fetch inspections",
    });
  }
});

app.post("/api/inspections", async (req, res) => {
  try {
    const inspectionData = req.body;
    if (!inspectionData.projectId || !inspectionData.projectName) {
  return res.status(400).json({
    error: "projectId and projectName are required",
  });
}

    const docRef = await db.collection("inspections").add({
      ...inspectionData,
      status: inspectionData.status || "Pending Verification",
      submittedAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Inspection submitted successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error submitting inspection:", error);

    res.status(500).json({
      error: "Failed to submit inspection",
    });
  }
});

app.get("/api/notifications", async (req, res) => {
  try {
    const snapshot = await db.collection("notifications").get();

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);

    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
});

app.patch("/api/inspections/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;
  const allowedStatuses = ["Pending Verification", "Completed", "Sent Back", "Assigned", "In Progress"];

if (!allowedStatuses.includes(status)) {
  return res.status(400).json({
    error: "Invalid inspection status",
  });
}

  console.log("PATCH HIT:", id, status, remarks);

  try {
    const inspectionRef = db.collection("inspections").doc(id);

    await inspectionRef.update({
      status: status,
      verificationRemarks: remarks || "",
      verifiedAt: new Date().toISOString(),
    });

    res.json({
      message: "Inspection status updated successfully",
      id: id,
      status: status,
      remarks: remarks || "",
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    res.status(500).json({
      error: "Failed to update inspection status",
    });
  }
});

app.post("/api/dispatch/generate", async (req, res) => {
  try {
    const options = {
      pythonPath: "/opt/anaconda3/bin/python3",
      scriptPath: __dirname,
    };

    PythonShell.run("generate_dispatch.py", options)
      .then(async (results) => {
        console.log("Dispatch generation completed");

        const snapshot = await db.collection("pmu_dispatch").get();

        const batch = db.batch();

        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        const dispatchData = results;

        const generatedDispatch = dispatchData.length > 0
          ? JSON.parse(dispatchData[dispatchData.length - 1])
          : [];

        generatedDispatch.forEach((assignment) => {
          const docRef = db.collection("pmu_dispatch").doc(assignment.project_id);
          batch.set(docRef, assignment);
        });

        await batch.commit();

        res.json({
          message: "Dispatch schedule generated successfully",
          assignments: generatedDispatch,
        });
      })
      .catch((error) => {
        console.error("Dispatch generation error:", error);

        res.status(500).json({
          error: "Failed to generate dispatch schedule",
          details: error.message,
        });
      });
  } catch (error) {
    console.error("Dispatch endpoint error:", error);

    res.status(500).json({
      error: "Failed to generate dispatch schedule",
    });
  }
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
