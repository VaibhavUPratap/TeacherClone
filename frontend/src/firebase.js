import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRbJNcPC2SPo064VcVlBHi0Y60IJtaRA4",
  authDomain: "code-clash-107.firebaseapp.com",
  projectId: "code-clash-107",
  storageBucket: "code-clash-107.firebasestorage.app",
  messagingSenderId: "681506257207",
  appId: "1:681506257207:web:16cfeda5121ff3c39042b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
