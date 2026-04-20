// js/books.js
import { auth, onAuthStateChanged, db } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
});

async function loadBooks() {
    const res = await fetch("data/books.json");
    const books = await res.json();

    const container = document.getElementById("booksContainer");

    container.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>₹${book.price}</p>
            <button onclick="addToCart('${book.id}')">Add to Cart</button>
        `;

        container.appendChild(card);
    });
}

loadBooks();

async function addToCart(bookId) {
    const user = auth.currentUser;

    if (!user) return alert("Login first");

    await addDoc(collection(db, "cart"), {
        userId: user.uid,
        bookId,
        createdAt: Date.now()
    });

    alert("📚 Added to cart");
}

window.addToCart = addToCart;
