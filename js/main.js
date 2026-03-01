// js/main.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase.js';
import { updateProfile } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// ===== SIGNUP LOGIC =====
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            document.getElementById("signupError").innerText = "Passwords do not match!";
            document.getElementById("signupError").style.display = "block";
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Save displayName (user's name)
                updateProfile(userCredential.user, { displayName: name })
                    .then(() => {
                        alert("Signup successful! Please login.");
                        window.location.href = "login.html";
                    })
                    .catch((error) => {
                        document.getElementById("signupError").innerText = error.message;
                        document.getElementById("signupError").style.display = "block";
                    });
            })
            .catch((error) => {
                document.getElementById("signupError").innerText = error.message;
                document.getElementById("signupError").style.display = "block";
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
                // Save user to localStorage
                localStorage.setItem("currentUser", JSON.stringify({
                    email: userCredential.user.email,
                    name: userCredential.user.displayName
                }));
                alert("Login successful!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                document.getElementById("loginError").innerText = error.message;
                document.getElementById("loginError").style.display = "block";
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
        greeting.innerHTML = `Hi, ${user.name}`; // display user name
        if (logoutBtn) logoutBtn.style.display = "block";
    }
});

// Export functions for other pages
export { checkAuth, logout };
