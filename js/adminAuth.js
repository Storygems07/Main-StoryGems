import { auth, db, onAuthStateChanged } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const adminRef = doc(db, "admins", user.uid);
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {

            alert("Access Denied!");

            window.location.href = "index.html";
            return;
        }

        const data = adminSnap.data();

        if (data.role !== "admin") {

            alert("Admins Only!");

            window.location.href = "index.html";
            return;
        }

        console.log("✅ Admin verified");

    } catch (error) {

        console.error(error);
        alert("Error checking admin.");

        window.location.href = "index.html";
    }

});
