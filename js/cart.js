// js/cart.js

import { auth, onAuthStateChanged } from './firebase.js';

// 🔐 AUTH
onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// LOAD CART
async function loadCart(){

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const res = await fetch("data/books.json");
const books = await res.json();

const container = document.getElementById("cartItems");
const totalEl = document.getElementById("totalPrice");

container.innerHTML = "";

let total = 0;

cart.forEach((item, index) => {

const book = books.find(b => b.id === item.id);

if(!book) return;

// 💰 PRICE CALCULATION
const finalPrice = book.price + 50 + 10;

total += finalPrice;

const div = document.createElement("div");
div.className = "item";

div.innerHTML = `
<span>${book.title}</span>
<span>₹${finalPrice}</span>
<button class="remove-btn" onclick="removeItem(${index})">Remove</button>
`;

container.appendChild(div);

});

totalEl.innerText = `Total: ₹${total}`;

}

// ❌ REMOVE ITEM
function removeItem(index){

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cart.splice(index, 1);

localStorage.setItem('cart', JSON.stringify(cart));

loadCart();

}

// ➡️ CHECKOUT
function checkout(){

window.location.href = "checkout.html";

}

window.removeItem = removeItem;
window.checkout = checkout;

loadCart();
