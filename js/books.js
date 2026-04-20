// js/books.js

import { auth, onAuthStateChanged } from './firebase.js';

// AUTH
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// LOAD BOOKS
async function loadBooks(){

try{

const res = await fetch("data/books.json");
const books = await res.json();

const container = document.getElementById("booksContainer");

books.forEach(book => {

const card = document.createElement("div");
card.className = "book-card";

card.innerHTML = `
<h3>${book.title}</h3>
<p>${book.author}</p>
<p class="price">₹${book.price}</p>
<button onclick="addToCart('${book.id}')">Add to Cart</button>
`;

container.appendChild(card);

});

}catch(err){
console.error("Error loading books:", err);
}

}

loadBooks();

import { auth, onAuthStateChanged, db } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// AUTH
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// LOAD BOOKS
async function loadBooks() {
    try {
        const res = await fetch("data/books.json");
        const books = await res.json();

        const container = document.getElementById("booksContainer");

        books.forEach(book => {

            const card = document.createElement("div");
            card.className = "book-card";

            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="price">₹${book.price}</p>
                <button onclick="addToCart('${book.id}')">Add to Cart</button>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }
}

loadBooks();

// CART (FIREBASE ONLY)
async function addToCart(bookId){

    const user = auth.currentUser;

    if(!user){
        alert("Login first");
        return;
    }

    await addDoc(collection(db,"cart"), {
        userId: user.uid,
        bookId: bookId
    });

    alert("📚 Book added to cart!");
}

window.addToCart = addToCart;
