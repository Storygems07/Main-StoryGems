// js/shop.js

const age = localStorage.getItem("ageGroup");

const container = document.getElementById("booksContainer");
const searchInput = document.getElementById("search");

let allBooks = [];

// LOAD BOOKS
async function loadBooks(){

const res = await fetch("data/books.json");
const books = await res.json();

// filter by age
allBooks = books.filter(b => b.category === age);

renderBooks(allBooks);
}

// RENDER
function renderBooks(data){

container.innerHTML = "";

data.forEach(book => {

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<div class="img">${book.image || "📖"}</div>
<div class="title">${book.title}</div>
<div class="author">${book.author}</div>
<div class="rating">${getStars(book.rating)}</div>
<div class="price">₹${book.price}</div>
<button onclick="addToCart('${book.id}')">Add to Cart</button>
`;

container.appendChild(div);

});

}

// ⭐ STARS
function getStars(rating=4){
let stars = "";
for(let i=1;i<=5;i++){
stars += i <= rating ? "⭐" : "☆";
}
return stars;
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
