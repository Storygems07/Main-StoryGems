// js/books.js

import { auth, onAuthStateChanged, db } from './firebase.js';
import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// 🔐 AUTH CHECK
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        loadBooks(); // load only after login
    }
});

// 📚 LOAD BOOKS FROM FIRESTORE
async function loadBooks() {
    try {

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

    } catch (err) {
        console.error("Error loading books:", err);
    }
}

// 🛒 ADD TO CART
async function addToCart(bookId) {

    const user = auth.currentUser;

    if (!user) {
        alert("Login first");
        return;
    }

    try {
        await addDoc(collection(db, "cart"), {
            userId: user.uid,
            bookId: bookId,
            createdAt: Date.now()
        });

        alert("📚 Added to cart");

    } catch (err) {
        console.error("Error adding to cart:", err);
    }
}

window.addToCart = addToCart;
