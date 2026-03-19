// js/shop.js

const age = localStorage.getItem("ageGroup");

const container = document.getElementById("booksContainer");
const searchInput = document.getElementById("search");

let allBooks = [];

// LOAD BOOKS
async function loadBooks(){

const res = await fetch("data/books.json");
const books = await res.json();

allBooks = books.filter(b => b.category === age);

renderBooks(allBooks);

}

function renderBooks(data){

container.innerHTML = "";

data.forEach(book => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<div class="img"></div>
<h3>${book.title}</h3>
<p class="author">${book.author}</p>
<p class="price">₹${book.price}</p>
<button onclick="addToCart('${book.id}')">Add to Cart</button>
`;

container.appendChild(div);

});

}

// SEARCH
searchInput.addEventListener("input", () => {

const value = searchInput.value.toLowerCase();

const filtered = allBooks.filter(b =>
b.title.toLowerCase().includes(value)
);

renderBooks(filtered);

});

// CART
function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({id});

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart 🛒");

}

window.addToCart = addToCart;

loadBooks();
