// GET ID FROM URL
import { db, auth } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// GET ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentBook = null;

// LOAD BOOK
async function loadBook() {

    const res = await fetch("data/books.json");
    const books = await res.json();

    currentBook = books.find(b => b.id === id);

    document.getElementById("title").innerText = currentBook.title;
    document.getElementById("author").innerText = "by " + currentBook.author;
    document.getElementById("price").innerText = "₹" + currentBook.price;
    document.getElementById("desc").innerText =
        currentBook.desc || "A great book from StoryGems ✨";
}

loadBook();

// STARS
function getStars(rating = 4) {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
}

// ADD TO CART
async function addToCart() {

    const user = auth.currentUser;

    if (!user) {
        alert("Login first");
        return;
    }

    await addDoc(collection(db, "cart"), {
        userId: user.uid,
        bookId: currentBook.id,
        createdAt: Date.now()
    });

    alert("Added to cart 🛒");
}

window.addToCart = addToCart;
