import {
    auth,
    db,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const addressEl = document.getElementById("address");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {

            nameEl.innerText = user.displayName || "Not Available";
            emailEl.innerText = user.email;
            phoneEl.innerText = "-";
            addressEl.innerText = "-";

            return;
        }

        const data = snap.data();

        nameEl.innerText = data.name || user.displayName || "-";
        emailEl.innerText = data.email || user.email || "-";
        phoneEl.innerText = data.phone || "-";

        addressEl.innerText =
            `${data.apartment || ""} ${data.floor || ""} ${data.door || ""}
${data.area || ""}
${data.city || ""}, ${data.state || ""}
${data.country || ""}
${data.pincode || ""}`;

    } catch (err) {

        console.error(err);
        alert("Failed to load profile.");

    }

});

logoutBtn.onclick = async () => {

    try {

        await signOut(auth);

        localStorage.removeItem("currentUser");

        alert("Logged out successfully.");

        window.location.href = "login.html";

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

};
