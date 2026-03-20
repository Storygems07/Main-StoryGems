// js/includeNavbar.js

import { logout } from './main.js';

async function includeNavbar() {

    // 🔹 CREATE NAVBAR + BACK BUTTON AUTOMATICALLY
  document.body.insertAdjacentHTML("afterbegin", `
    <div id="navbar"></div>
`);

const isHome = window.location.pathname.includes("index.html") || window.location.pathname === "/";

if (!isHome) {
    document.body.insertAdjacentHTML("afterbegin", `
        <button class="back-btn" onclick="goBack()">← Back</button>
    `);
}

    const navbarContainer = document.getElementById("navbar");

    const response = await fetch("components/navbar.html");
    const navbarHTML = await response.text();

    navbarContainer.innerHTML = navbarHTML;

    // USER LOGIC
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        greeting.textContent = `Hi, ${user.name} ❤️`;
        logoutBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
        signupBtn.style.display = "none";

        logoutBtn.addEventListener("click", logout);
    } else {
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
        signupBtn.style.display = "inline-block";
    }
}

// BACK BUTTON
function goBack(){
    window.history.back();
}

window.goBack = goBack;




// 🛒 CART COUNT
function updateCartCount(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const countEl = document.getElementById("cartCount");

if(countEl){
countEl.innerText = cart.length;
}

}

updateCartCount();


includeNavbar();
