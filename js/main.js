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
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = getUsers();

        if (users.find(user => user.email === email)) {
            alert("Email already registered!");
            return;
        }

        users.push({ name, email, password });
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

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        let users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Invalid email or password!");
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
