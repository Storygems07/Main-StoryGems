// js/shop.js

import { db, auth } from "./firebase.js";

import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const age = localStorage.getItem("ageGroup");

const container = document.getElementById("booksContainer");
const searchInput = document.getElementById("search");

let allBooks = [];

// LOAD BOOKS
async function loadBooks() {
  try {
    const res = await fetch("data/books.json");
    const books = await res.json();

    allBooks = books.filter(b => b.category === age);

    renderBooks(allBooks);

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading books 😢</p>";
  }
}

// RENDER BOOKS
function renderBooks(data) {

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No books found 📭</p>";
    return;
  }

  data.forEach(book => {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="img" onclick="openProduct('${book.id}')">
        <img src="${book.image || 'https://via.placeholder.com/150'}" alt="${book.title}">
      </div>

      <div class="title" onclick="openProduct('${book.id}')">
        ${book.title}
      </div>

      <div class="author">
        by ${book.author}
      </div>

      <div class="rating">
        ${getStars(book.rating)}
      </div>

      <div class="price">
        ₹${book.price}
      </div>

      <button onclick="addToCart('${book.id}')">
        Add to Cart 🛒
      </button>
    `;

    container.appendChild(div);
  });
}

// STAR RATING
function getStars(rating = 4) {

  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "⭐" : "☆";
  }

  return stars;
}

// SEARCH
searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = allBooks.filter(book =>
    book.title.toLowerCase().includes(value)
  );

  renderBooks(filtered);

});

// ADD TO CART
async function addToCart(id) {

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {

    await addDoc(collection(db, "cart"), {
      userId: user.uid,
      bookId: id,
      createdAt: Date.now()
    });

    alert("🛒 Book added to cart!");

  } catch (err) {

    console.error(err);
    alert("Failed to add book to cart.");

  }

}

// OPEN PRODUCT PAGE
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

window.addToCart = addToCart;
window.openProduct = openProduct;

// START
loadBooks();
