// js/includeNavbar.js

import { logout } from './main.js';

async function includeNavbar() {

    // ONLY NAVBAR (NO BACK BUTTON)
    document.body.insertAdjacentHTML("afterbegin", `<div id="navbar"></div>`);

    const navbarContainer = document.getElementById("navbar");

    const response = await fetch("components/navbar.html");
    const navbarHTML = await response.text();

    navbarContainer.innerHTML = navbarHTML;

    // UPDATE CART COUNT
    updateCartCount();

    // USER LOGIC
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

  import { auth, onAuthStateChanged } from './firebase.js';
import { logout } from './main.js';

async function includeNavbar(){

document.body.insertAdjacentHTML("afterbegin", `<div id="navbar"></div>`);

const res = await fetch("components/navbar.html");
document.getElementById("navbar").innerHTML = await res.text();

onAuthStateChanged(auth, (user) => {

const greeting = document.getElementById("userGreeting");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if(user){
    greeting.textContent = `Hi, ${user.displayName || "User"} ❤️`;
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
}else{
    greeting.textContent = "";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
}

});

}

includeNavbar();
