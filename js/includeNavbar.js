// js/includeNavbar.js

import { logout } from './main.js';

async function includeNavbar() {
    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) return;

    try {
        const response = await fetch("components/navbar.html");
        const navbarHTML = await response.text();
        navbarContainer.innerHTML = navbarHTML;

        const greeting = document.getElementById("userGreeting");
        const logoutBtn = document.getElementById("logoutBtn");
        const loginBtn = document.getElementById("loginBtn");
        const signupBtn = document.getElementById("signupBtn");

        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (user) {
            if (greeting) greeting.textContent = `Hi, ${user.name}`;
            if (logoutBtn) logoutBtn.style.display = "inline-block";
            if (loginBtn) loginBtn.style.display = "none";
            if (signupBtn) signupBtn.style.display = "none";

            if (logoutBtn) logoutBtn.addEventListener("click", logout);
        } else {
            if (logoutBtn) logoutBtn.style.display = "none";
            if (loginBtn) loginBtn.style.display = "inline-block";
            if (signupBtn) signupBtn.style.display = "inline-block";
            if (greeting) greeting.textContent = "";
        }
    } catch (err) {
        console.error("Error loading navbar:", err);
    }
}

includeNavbar();
