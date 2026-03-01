// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoa8B1K0lxOV54BrRweYvmjxM5YYIiBvQ",
  authDomain: "storygems-6ac57.firebaseapp.com",
  projectId: "storygems-6ac57",
  storageBucket: "storygems-6ac57.firebasestorage.app",
  messagingSenderId: "872029087113",
  appId: "1:872029087113:web:7a9f30109379b21aaced58",
  measurementId: "G-Y0HJE06TVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
};
