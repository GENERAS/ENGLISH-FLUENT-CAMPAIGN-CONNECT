import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import appletConfig from "../firebase-applet-config.json";

// Production Firebase configuration, falling back to EFC defaults if not provided
const firebaseConfig = {
  apiKey: appletConfig.apiKey || "AIzaSyCUUXGT47PupflmLD2OgoK3-dwEng-mGIo",
  authDomain: appletConfig.authDomain || "efc-rwandan-schools.firebaseapp.com",
  projectId: appletConfig.projectId || "efc-rwandan-schools",
  storageBucket: appletConfig.storageBucket || "efc-rwandan-schools.firebasestorage.app",
  messagingSenderId: appletConfig.messagingSenderId || "311022171521",
  appId: appletConfig.appId || "1:311022171521:web:4495fdc447b26b8348a480",
  measurementId: appletConfig.measurementId || "G-3541QR617T"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally to avoid failure in non-browser environments or sandboxes
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});

// Initialize Firestore using the configured database with experimental auto-detect long polling
const databaseId = appletConfig.firestoreDatabaseId || "(default)";
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
}, databaseId);

// Initialize Authentication and Storage
export const auth = getAuth(app);
export const storage = getStorage(app);
