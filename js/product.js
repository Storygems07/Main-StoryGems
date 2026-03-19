// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentBook = null;

// LOAD BOOK
async function loadBook(){

const res = await fetch("data/books.json");
const books = await res.json();

const book = books.find(b => b.id === id);

currentBook = book;

// SET DATA
document.getElementById("bookImg").innerText = book.image || "📖";
document.getElementById("title").innerText = book.title;
document.getElementById("author").innerText = "by " + book.author;
document.getElementById("rating").innerText = getStars(book.rating);
document.getElementById("price").innerText = "₹" + book.price;

// DESCRIPTION (default if not in JSON)
document.getElementById("desc").innerText =
book.desc || "This is a beautifully curated book perfect for your reading journey. A must-read from StoryGems ✨";

}

// ⭐ STARS
function getStars(rating=4){
let stars="";
for(let i=1;i<=5;i++){
stars += i<=rating ? "⭐" : "☆";
}
return stars;
}

// CART
function addToCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({id: currentBook.id});

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart 🛒");

}

loadBook();
