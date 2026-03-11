// js/books.js
import { auth, onAuthStateChanged } from './firebase.js';

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

async function loadBooks() {

try {

const response = await fetch('data/books.json');
const books = await response.json();

localStorage.setItem("booksData", JSON.stringify(books));

const container = document.getElementById('booksContainer');

books.forEach(book => {

const card = document.createElement('div');

card.className = 'category-card';

card.innerHTML = `
<h3>${book.title}</h3>
<p>${book.author}</p>
<p>₹${book.price}</p>
<button onclick="addToCart('${book.id}')">Add to Cart</button>
`;

container.appendChild(card);

});

} catch(err) {

console.error("Error loading books:", err);

}

}

loadBooks();

function addToCart(bookId){

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cart.push(bookId);

localStorage.setItem('cart', JSON.stringify(cart));

alert("Book added to cart!");

}

window.addToCart = addToCart;
