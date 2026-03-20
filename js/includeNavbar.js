// js/includeNavbar.js

import { logout } from './main.js';

async function includeNavbar() {

    // ADD NAVBAR ONLY (NO BACK BUTTON)
    document.body.insertAdjacentHTML("afterbegin", `<div id="navbar"></div>`);

    const navbarContainer = document.getElementById("navbar");

    const response = await fetch("components/navbar.html");
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;

    updateCartCount();

    // USER LOGIC
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        if (greeting) greeting.textContent = `Hi, ${user.name} ❤️`;
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";

        logoutBtn?.addEventListener("click", logout);
    } else {
        if (logoutBtn) logoutBtn.style.display = "none";
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (signupBtn) signupBtn.style.display = "inline-block";
    }
}

// CART COUNT
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cartCount");

    if (countEl) countEl.innerText = cart.length;
}

window.updateCartCount = updateCartCount;

includeNavbar();
