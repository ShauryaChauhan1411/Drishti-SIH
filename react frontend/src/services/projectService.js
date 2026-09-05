import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getProjects() {
  const snapshot = await getDocs(collection(db, "projects"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}