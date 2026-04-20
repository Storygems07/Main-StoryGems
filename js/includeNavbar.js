// js/includeNavbar.js
import { auth, onAuthStateChanged } from './firebase.js';

async function includeNavbar() {

    document.body.insertAdjacentHTML("afterbegin", `<div id="navbar"></div>`);

    const res = await fetch("components/navbar.html");
    document.getElementById("navbar").innerHTML = await res.text();

    onAuthStateChanged(auth, (user) => {

        const greeting = document.getElementById("userGreeting");
        const logoutBtn = document.getElementById("logoutBtn");
        const loginBtn = document.getElementById("loginBtn");
        const signupBtn = document.getElementById("signupBtn");

        if (!greeting || !logoutBtn || !loginBtn || !signupBtn) return;

        if (user) {
            greeting.textContent = `Hi, ${user.displayName || "User"} ❤️`;
            logoutBtn.style.display = "inline-block";
            loginBtn.style.display = "none";
            signupBtn.style.display = "none";
        } else {
            greeting.textContent = "";
            logoutBtn.style.display = "none";
            loginBtn.style.display = "inline-block";
            signupBtn.style.display = "inline-block";
        }
    });
}

includeNavbar();
