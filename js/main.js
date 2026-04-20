// js/main.js

import {
auth,
db,
doc,
setDoc,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
updateProfile
} from './firebase.js';



/* =========================
   SIGNUP
========================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();

const country = document.getElementById("country").value;
const state = document.getElementById("state").value.trim();
const city = document.getElementById("city").value.trim();
const area = document.getElementById("area").value.trim();

const apartment = document.getElementById("apartment").value.trim();
const floor = document.getElementById("floor").value.trim();
const door = document.getElementById("door").value.trim();

const landmark = document.getElementById("landmark").value.trim();
const pincode = document.getElementById("pincode").value.trim();

const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

const signupError = document.getElementById("signupError");

signupError.style.display = "none";


/* Password check */

if (password !== confirmPassword) {

signupError.innerText = "Passwords do not match";
signupError.style.display = "block";
return;

}

if (password.length < 6) {

signupError.innerText = "Password must be at least 6 characters";
signupError.style.display = "block";
return;

}


try {

/* Create account */

const userCredential = await createUserWithEmailAndPassword(auth, email, password);

const user = userCredential.user;


/* Add display name */

await updateProfile(user, {
displayName: name
});


/* Save user profile in Firestore */

await setDoc(doc(db, "users", user.uid), {

name,
email,
phone,

country,
state,
city,
area,

apartment,
floor,
door,

landmark,
pincode

});


alert("Signup successful!");

window.location.href = "login.html";

}

catch (error) {

signupError.innerText = error.message;
signupError.style.display = "block";

}

});

}



/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("loginInput").value.trim();
const password = document.getElementById("loginPassword").value;

let loginError = document.getElementById("loginError");

if (!loginError) {

loginError = document.createElement("p");
loginError.className = "auth-error";
loginForm.prepend(loginError);

}

loginError.style.display = "none";


try {

const userCredential = await signInWithEmailAndPassword(auth, email, password);

const user = userCredential.user;


/* Save current user locally */

// DO NOTHING HERE
// Firebase already keeps user logged in


alert("Login successful!");

window.location.href = "books.html";

}

catch (error) {

loginError.innerText = error.message;
loginError.style.display = "block";

}

});

}



/* =========================
   LOGOUT
========================= */

function logout() {

signOut(auth).then(() => {

localStorage.removeItem("currentUser");

window.location.href = "login.html";

});

}

export { logout };
