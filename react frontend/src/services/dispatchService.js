import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export async function getDispatches() {
  const snapshot = await getDocs(collection(db, "pmu_dispatch"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}