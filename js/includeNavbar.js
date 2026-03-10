// js/includeNavbar.js
import { logout } from './main.js';  // use your main.js logout function

async function includeNavbar() {
    // Load navbar HTML from components
    const navbarContainer = document.getElementById("navbar");
    const response = await fetch('components/navbar.html');
    navbarContainer.innerHTML = await response.text();

    // Get elements
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
        greeting.innerHTML = `Hi, ${user.name}`;
        logoutBtn.style.display = "block";
    }
}

// Run it
includeNavbar();
