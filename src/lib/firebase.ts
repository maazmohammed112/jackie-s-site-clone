import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, update, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"] || "AIzaSyCWg-Um6HLH-zavc7iYh10-Kr_KlPQjINw",
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"] || "maazprofile.firebaseapp.com",
  databaseURL: import.meta.env["VITE_FIREBASE_DATABASE_URL"] || "https://maazprofile-default-rtdb.firebaseio.com",
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"] || "maazprofile",
  storageBucket: import.meta.env["VITE_FIREBASE_STORAGE_BUCKET"] || "maazprofile.firebasestorage.app",
  messagingSenderId: import.meta.env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "49898800576",
  appId: import.meta.env["VITE_FIREBASE_APP_ID"] || "1:49898800576:web:7d9a6c93809beaa68bf425",
  measurementId: import.meta.env["VITE_FIREBASE_MEASUREMENT_ID"] || "G-VQSHZDSRBB"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);

export { ref, onValue, push, set, update, runTransaction };
