// fireapp.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBViFS1hgp6BUlmo0RTzKZrV3_LZ9wxgrI",
  authDomain: "nexora-5ba75.firebaseapp.com",
  projectId: "nexora-5ba75",
  storageBucket: "nexora-5ba75.firebasestorage.app",
  messagingSenderId: "305769602888",
  appId: "1:305769602888:web:cece9d7a8becc8baf5dd7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
