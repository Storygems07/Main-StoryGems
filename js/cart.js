// js/cart.js

import { auth, onAuthStateChanged } from './firebase.js';

// 🔐 AUTH
onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// LOAD CART
import { db, auth } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

async function addToCart(id){

    const user = auth.currentUser;

    if(!user){
        alert("Please login first");
        return;
    }

    await addDoc(collection(db,"cart"),{
        userId: user.uid,
        bookId: id
    });

    alert("Added to cart 🛒");
}

window.addToCart = addToCart;

async function loadCart(){

const user = auth.currentUser;

const q = query(
collection(db,"cart"),
where("userId","==", user.uid)
);

const snapshot = await getDocs(q);

const container = document.getElementById("cartItems");
container.innerHTML = "";

snapshot.forEach(docSnap => {

const data = docSnap.data();

const div = document.createElement("div");

div.innerHTML = `
<p>${data.bookId}</p>
<button onclick="removeItem('${docSnap.id}')">Remove</button>
`;

container.appendChild(div);
});
}

async function removeItem(id){
await deleteDoc(doc(db,"cart",id));
loadCart();
}

window.removeItem = removeItem;


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





loadCart();

}

// ➡️ CHECKOUT
function checkout(){

window.location.href = "checkout.html";

}

window.removeItem = removeItem;
window.checkout = checkout;

loadCart();
