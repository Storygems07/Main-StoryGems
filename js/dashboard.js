import { auth, onAuthStateChanged, db } from './firebase.js';
import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let booksCache = [];

// AUTH CHECK
onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.href = "login.html";
return;
}

document.getElementById("welcome").innerText =
`Welcome, ${user.displayName || "User"} 👋`;

await loadBooks();
await loadDashboard(user.uid);

});

// LOAD BOOKS
async function loadBooks() {
const res = await fetch("data/books.json");
booksCache = await res.json();
}

// LOAD DASHBOARD
async function loadDashboard(userId) {

const q = query(
collection(db, "orders"),
where("userId", "==", userId)
);

const snapshot = await getDocs(q);

let ordersCount = 0;
let booksCount = 0;
let activeOrders = 0;

const ordersList = document.getElementById("ordersList");
ordersList.innerHTML = "";

snapshot.forEach(docSnap => {

const data = docSnap.data();

ordersCount++;

if (data.status !== "Delivered") activeOrders++;

if (data.items) booksCount += data.items.length;

// ORDER CARD
const div = document.createElement("div");
div.className = "order";

div.innerHTML = `
<strong>Order:</strong> ${docSnap.id} <br>
<strong>Status:</strong> ${data.status || "Processing"} <br>
<strong>Total:</strong> ₹${data.total || 0}
`;

ordersList.appendChild(div);

});

// STATS
document.getElementById("ordersCount").innerText = ordersCount;
document.getElementById("booksCount").innerText = booksCount;
document.getElementById("activeOrders").innerText = activeOrders;
}
