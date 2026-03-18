// js/books.js


import { auth, onAuthStateChanged } from './firebase.js';

// 🔐 AUTH CHECK
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// 📦 DATA
const plan = parseInt(localStorage.getItem("plan")) || 2;
const categories = JSON.parse(localStorage.getItem("categories")) || [];

let books = [];
let selections = [];

// 📚 LOAD BOOKS FROM JSON
async function loadBooks() {
    try {
        const res = await fetch("data/books.json");
        const data = await res.json();

        // FILTER BASED ON CATEGORY
        books = data.filter(b => categories.includes(b.category));

        // if no category selected, show all
        if (books.length === 0) {
            books = data;
        }

        renderMonths();

    } catch (err) {
        console.error("Error loading books:", err);
    }
}

loadBooks();

// 🧩 CREATE MONTH UI
function renderMonths() {

    const container = document.getElementById("container");
    container.innerHTML = "";

    for (let i = 1; i <= plan; i++) {

        const div = document.createElement("div");
        div.className = "month";

        div.innerHTML = `
        <h3>Month ${i}</h3>

        <div class="options">
            <div class="option" data-type="own">Choose Book</div>
            <div class="option" data-type="blind">Blind Date 🎁 (+₹49)</div>
        </div>

        <div class="books">
            ${books.map(b => `
                <div class="book" data-price="${b.price}">
                    ${b.title} - ₹${b.price}
                </div>
            `).join("")}
        </div>
        `;

        container.appendChild(div);
    }

    attachEvents();
}

// 🎯 EVENTS
function attachEvents() {

    document.querySelectorAll(".month").forEach((monthDiv, index) => {

        const options = monthDiv.querySelectorAll(".option");
        const bookEls = monthDiv.querySelectorAll(".book");

        let type = null;
        let selectedBook = null;
        let bookPrice = 0;

        options.forEach(opt => {
            opt.onclick = () => {

                options.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");

                type = opt.dataset.type;

                if (type === "blind") {
                    monthDiv.querySelector(".books").style.display = "none";
                    selectedBook = "Hidden (Surprise Book)";
                    bookPrice = 300; // default avg
                } else {
                    monthDiv.querySelector(".books").style.display = "flex";
                }

                update();
            };
        });

        bookEls.forEach(book => {
            book.onclick = () => {

                bookEls.forEach(b => b.classList.remove("selected"));
                book.classList.add("selected");

                selectedBook = book.innerText;
                bookPrice = parseInt(book.dataset.price);

                update();
            };
        });

        function update() {

            selections[index] = {
                month: index + 1,
                type: type,
                book: selectedBook,
                price: bookPrice
            };

            calculate();
        }

    });
}

// 💰 PRICE CALCULATION
function calculate() {

    let total = 0;

    selections.forEach(sel => {

        if (!sel) return;

        total += sel.price || 0;
        total += 200; // packaging + eco

        if (sel.type === "blind") {
            total += 49;
        }

    });

    document.getElementById("totalPrice").innerText =
        `Total: ₹${total}`;
}

// ➡️ CONTINUE
document.getElementById("continueBtn").onclick = () => {

    if (selections.length !== plan) {
        alert("Complete all months");
        return;
    }

    for (let s of selections) {
        if (!s || !s.type) {
            alert("Select option for all months");
            return;
        }
        if (s.type === "own" && !s.book) {
            alert("Select a book");
            return;
        }
    }

    localStorage.setItem("booksData", JSON.stringify(selections));

    window.location.href = "checkout.html";
};
