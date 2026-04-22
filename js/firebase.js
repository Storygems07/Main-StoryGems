// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAoa8B1K0lxOV54BrRweYvmjxM5YYIiBvQ",
authDomain: "storygems-6ac57.firebaseapp.com",
projectId: "storygems-6ac57",
storageBucket: "storygems-6ac57.firebasestorage.app",
messagingSenderId: "872029087113",
appId: "1:872029087113:web:7a9f30109379b21aaced58",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged };
