// js/books.js
import { auth, db, onAuthStateChanged } from './firebase.js';
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// AUTH CHECK
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html";
});

// LOAD BOOKS
async function loadBooks() {

  const snapshot = await getDocs(collection(db, "books"));

  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  snapshot.forEach(doc => {

    const book = doc.data();

    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>₹${book.price}</p>
      <button onclick="addToCart('${doc.id}')">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

loadBooks();

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
