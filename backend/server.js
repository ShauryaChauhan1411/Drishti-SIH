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