// js/cart.js
import { auth, onAuthStateChanged, db } from './firebase.js';
import {
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let booksCache = [];

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
    else loadCart(user.uid);
});

async function loadBooks() {
    const res = await fetch("data/books.json");
    booksCache = await res.json();
}

async function loadCart(userId) {

    await loadBooks();

    const q = query(
        collection(db, "cart"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("totalPrice");

    container.innerHTML = "";

    let total = 0;

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        const book = booksCache.find(b => b.id === data.bookId);
        if (!book) return;

        total += book.price;

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <span>${book.title}</span>
            <span>₹${book.price}</span>
            <button onclick="removeItem('${docSnap.id}')">Remove</button>
        `;

        container.appendChild(div);
    });

    totalEl.innerText = "Total: ₹" + total;
}

async function removeItem(id) {
    await deleteDoc(doc(db, "cart", id));

    const user = auth.currentUser;
    if (user) loadCart(user.uid);
}

window.removeItem = removeItem;

function checkout() {
    window.location.href = "checkout.html";
}

window.checkout = checkout;
