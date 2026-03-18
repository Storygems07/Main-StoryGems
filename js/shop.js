// js/shop.js

const category = localStorage.getItem("category");

// safety
if(!category){
window.location.href = "books.html";
}

document.getElementById("title").innerText = category + " Books 📚";

const container = document.getElementById("booksContainer");

// FETCH FROM JSON
async function loadBooks(){

const res = await fetch("data/books.json");
const books = await res.json();

// filter
const filtered = books.filter(b => b.category === category);

filtered.forEach(book => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<h3>${book.title}</h3>
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
