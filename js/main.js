// js/main.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase.js';

// ===== SIGNUP LOGIC =====
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Signup successful! Please login.");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// ===== LOGIN LOGIC =====
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginInput").value.trim();
        const password = document.getElementById("loginPassword").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
                alert("Login successful!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// ===== CHECK LOGIN =====
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html";
        }
    });
}

// ===== LOGOUT =====
function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}

// ===== NAVBAR USER DISPLAY =====
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");

    if (user && greeting) {
        greeting.innerHTML = `Hello, ${user.email}`;
        if (logoutBtn) logoutBtn.style.display = "block";
    }
});

// Export functions for other pages
export { checkAuth, logout };
