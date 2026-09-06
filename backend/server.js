const express = require("express");
const cors = require("cors");
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


const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});