import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getPMUTeams() {
  const snapshot = await getDocs(collection(db, "pmu_teams"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}