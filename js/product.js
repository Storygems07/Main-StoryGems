// js/product.js

import { db, auth } from './firebase.js';
import { doc, getDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentBook = null;

// LOAD SINGLE BOOK
async function loadBook() {

    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        document.body.innerHTML = "<h2>Book not found</h2>";
        return;
    }

    currentBook = { id: docSnap.id, ...docSnap.data() };

    document.getElementById("title").innerText = currentBook.title;
    document.getElementById("author").innerText = "by " + currentBook.author;
    document.getElementById("price").innerText =
        "₹" + (currentBook.paperbackPrice || currentBook.hardcoverPrice);
}

// LOAD
loadBook();

// ADD TO CART
async function addToCart() {

    const user = auth.currentUser;

    if (!user) return alert("Login first");

    await addDoc(collection(db, "cart"), {
        userId: user.uid,
        bookId: currentBook.id,
        createdAt: Date.now()
    });

    alert("🛒 Added to cart");
}

window.addToCart = addToCart;
