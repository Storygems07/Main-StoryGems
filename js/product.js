// js/product.js

import { db, auth } from "./firebase.js";

import {
    doc,
    getDoc,
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentBook = null;

// LOAD BOOK
async function loadBook() {

    if (!id) {
        document.body.innerHTML = "<h2>Invalid Book</h2>";
        return;
    }

    try {

        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            document.body.innerHTML = "<h2>Book not found</h2>";
            return;
        }

        currentBook = {
            id: docSnap.id,
            ...docSnap.data()
        };

        const price =
            currentBook.paperbackPrice ||
            currentBook.hardcoverPrice ||
            currentBook.price ||
            0;

        document.getElementById("title").innerText = currentBook.title;
        document.getElementById("author").innerText = "by " + currentBook.author;
        document.getElementById("price").innerText = "₹" + price;

        document.getElementById("rating").innerText =
            "⭐ " + (currentBook.rating || 4.5);

        document.getElementById("desc").innerText =
            currentBook.description || "No description available.";

        document.getElementById("bookImg").innerHTML = `
            <img
                src="${currentBook.image || 'https://via.placeholder.com/250x350'}"
                alt="${currentBook.title}">
        `;

    } catch (error) {

        console.error(error);
        document.body.innerHTML = "<h2>Error loading book.</h2>";

    }

}

// LOAD BOOK WHEN PAGE OPENS
loadBook();

// ADD TO CART
async function addToCart() {

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    if (!currentBook) {
        alert("Book not loaded.");
        return;
    }

    try {

        await addDoc(collection(db, "cart"), {
            userId: user.uid,
            bookId: currentBook.id,
            createdAt: Date.now()
        });

        alert("🛒 Book added to cart!");

    } catch (error) {

        console.error(error);
        alert("Failed to add book to cart.");

    }

}

window.addToCart = addToCart;
