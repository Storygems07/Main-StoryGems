const age = localStorage.getItem("ageGroup");

const container = document.getElementById("booksContainer");
const searchInput = document.getElementById("search");

let allBooks = [];

// LOAD BOOKS
async function loadBooks() {
  try {
    const res = await fetch("data/books.json");
    const books = await res.json();

    allBooks = books.filter(b => b.category === age);

    renderBooks(allBooks);

  } catch (err) {
    container.innerHTML = "<p>Error loading books 😢</p>";
  }
}

// RENDER
function renderBooks(data) {

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No books found 📭</p>";
    return;
  }

  data.forEach(book => {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="img" onclick="openProduct('${book.id}')">
        <img src="${book.image || 'https://via.placeholder.com/150'}">
      </div>

      <div class="title" onclick="openProduct('${book.id}')">
        ${book.title}
      </div>

      <div class="author">by ${book.author}</div>

      <div class="rating">${getStars(book.rating)}</div>

      <div class="price">₹${book.price}</div>

      <button onclick="addToCart('${book.id}')">
        Add to Cart 🛒
      </button>
    `;

    container.appendChild(div);
  });
}

// STARS
function getStars(rating = 4) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
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

// UPDATE BADGE
window.updateCartCount();

alert("Added to cart 🛒");

}

// OPEN PRODUCT
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

window.addToCart = addToCart;
window.openProduct = openProduct;

loadBooks();
