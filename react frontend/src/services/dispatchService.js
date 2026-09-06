import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export async function getDispatches() {
  const snapshot = await getDocs(collection(db, "pmu_dispatch"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function generateDispatches() {
  const response = await fetch("http://localhost:5050/api/dispatch/generate", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to generate dispatch schedule");
  }

  return await response.json();
}