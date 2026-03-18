// js/shop.js

const age = localStorage.getItem("ageGroup");

// safety
if(!age){
window.location.href = "books.html";
}

document.getElementById("title").innerText =
age.toUpperCase() + " Books 📚";

const container = document.getElementById("booksContainer");

// LOAD BOOKS
async function loadBooks(){

const res = await fetch("data/books.json");
const books = await res.json();

// 🔥 FILTER BY AGE (IMPORTANT FIX)
const filtered = books.filter(b => b.category === age);

filtered.forEach(book => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<h3>${book.title}</h3>
<p>${book.author}</p>
<p class="price">₹${book.price}</p>
<button onclick="addToCart('${book.id}')">Add to Cart</button>
`;

container.appendChild(div);

});

}

loadBooks();

// ADD TO CART
function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({id});

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart 🛒");

}

window.addToCart = addToCart;
