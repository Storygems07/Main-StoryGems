
// js/includeNavbar.js

import { logout } from './main.js';

async function includeNavbar() {

    const path = window.location.pathname;

    const isHome =
        path.includes("index.html") ||
        path === "/" ||
        path === "";

    const isShop = path.includes("shop.html");

    // ❌ CLEAR OLD BACK BUTTON (IMPORTANT FIX)
    const oldBtn = document.querySelector(".back-btn");
    if (oldBtn) oldBtn.remove();

    // ✅ ADD NAVBAR ONLY
    document.body.insertAdjacentHTML("afterbegin", `<div id="navbar"></div>`);

    // ✅ ADD BACK BUTTON ONLY WHEN NEEDED
    if (!isHome && !isShop) {
        const btn = document.createElement("button");
        btn.className = "back-btn";
        btn.innerText = "← Back";
        btn.onclick = goBack;

        document.body.appendChild(btn);
    }

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

// BACK
function goBack() {
    window.history.back();
}
window.goBack = goBack;

// CART
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cartCount");

    if (countEl) countEl.innerText = cart.length;
}

window.updateCartCount = updateCartCount;

includeNavbar();
