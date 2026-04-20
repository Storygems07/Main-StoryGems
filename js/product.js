import { db, auth } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentBook = null;

async function loadBook() {
    const res = await fetch("data/books.json");
    const books = await res.json();

    currentBook = books.find(b => b.id === id);

    if (!currentBook) {
        document.body.innerHTML = "<h2>Book not found</h2>";
        return;
    }

    document.getElementById("title").innerText = currentBook.title;
    document.getElementById("author").innerText = "by " + currentBook.author;
    document.getElementById("price").innerText = "₹" + currentBook.price;
    document.getElementById("desc").innerText =
        currentBook.desc || "A great book from StoryGems ✨";
}

loadBook();

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
