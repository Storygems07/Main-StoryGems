// js/books.js

import { auth, onAuthStateChanged, db } from './firebase.js';
import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// AUTH CHECK
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        loadBooks();
    }
});

// LOAD BOOKS FROM FIRESTORE
async function loadBooks() {

    const snapshot = await getDocs(collection(db, "books"));

    const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    books.forEach(book => {

        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>₹${book.paperbackPrice || book.hardcoverPrice}</p>
            <button onclick="addToCart('${book.id}')">Add to Cart</button>
        `;

        container.appendChild(card);
    });
}

// ADD TO CART
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
