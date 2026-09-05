import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgfm5vSmKefOTT5rmKYH8lI-gL-l_inCA",
  authDomain: "drishti-sih.firebaseapp.com",
  projectId: "drishti-sih",
  storageBucket: "drishti-sih.firebasestorage.app",
  messagingSenderId: "859223730273",
  appId: "1:859223730273:web:73379accdbbc70926b6220"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);