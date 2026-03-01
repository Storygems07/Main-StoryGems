// js/main.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from './firebase.js';

// ===== SIGNUP LOGIC =====
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const signupError = document.getElementById("signupError");

        signupError.style.display = "none"; // reset error

        if (password !== confirmPassword) {
            signupError.innerText = "Passwords do not match!";
            signupError.style.display = "block";
            return;
        }

        if (password.length < 6) {
            signupError.innerText = "Password must be at least 6 characters!";
            signupError.style.display = "block";
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name }); // save name

            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } catch (error) {
            signupError.innerText = error.message;
            signupError.style.display = "block";
        }
    });
}

// ===== LOGIN LOGIC =====
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("loginInput").value.trim();
        const password = document.getElementById("loginPassword").value;
        let loginError = document.getElementById("loginError");

        if (!loginError) {
            loginError = document.createElement("p");
            loginError.id = "loginError";
            loginError.className = "auth-error";
            loginForm.prepend(loginError);
        }

        loginError.style.display = "none";

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Save user to localStorage
            localStorage.setItem("currentUser", JSON.stringify({
                email: userCredential.user.email,
                name: userCredential.user.displayName
            }));

            alert("Login successful!");
            window.location.href = "index.html";
        } catch (error) {
            loginError.innerText = error.message;
            loginError.style.display = "block";
        }
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
        greeting.innerHTML = `Hi, ${user.name}`;
        if (logoutBtn) logoutBtn.style.display = "block";
    }
});

export { checkAuth, logout };
