// ===== GET USERS FROM STORAGE =====
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// ===== SAVE USERS =====
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// ===== SIGNUP LOGIC =====
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = getUsers();

        // Check email OR phone already exists
        const exists = users.find(user => user.email === email || user.phone === phone);

        if (exists) {
            alert("Email or phone already registered!");
            return;
        }

        users.push({ name, email, phone, password });
        saveUsers(users);

        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    });
}

// ===== LOGIN LOGIC =====
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const input = document.getElementById("loginEmail").value.trim(); // can be email OR phone
        const password = document.getElementById("loginPassword").value;

        let users = getUsers();

        const user = users.find(
            u => (u.email === input || u.phone === input) && u.password === password
        );

        if (!user) {
            alert("Invalid login details!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "index.html";
    });
}
// ===== CHECK LOGIN =====
function checkAuth() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}





// ===== NAVBAR USER DISPLAY =====
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const greeting = document.getElementById("userGreeting");
    const logoutBtn = document.getElementById("logoutBtn");

    if (user && greeting) {
        greeting.innerHTML = `Hello, ${user.name}`;
        logoutBtn.style.display = "block";
    }
});
