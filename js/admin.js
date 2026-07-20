import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
deleteDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const usersCount=document.getElementById("usersCount");
const booksCount=document.getElementById("booksCount");
const ordersCount=document.getElementById("ordersCount");
const revenue=document.getElementById("revenue");

const usersList=document.getElementById("usersList");
const booksList=document.getElementById("booksList");
const ordersList=document.getElementById("ordersList");

loadDashboard();

async function loadDashboard(){

await loadUsers();

await loadBooks();

await loadOrders();

}
// ======================
// LOAD USERS
// ======================

async function loadUsers(){

    const snapshot = await getDocs(
        collection(db,"users")
    );

    usersCount.innerText = snapshot.size;

    usersList.innerHTML = "";

    snapshot.forEach(docSnap=>{

        const user = docSnap.data();

        usersList.innerHTML += `

        <div class="user">

            <h3>${user.name || "No Name"}</h3>

            <p><b>Email:</b> ${user.email || "-"}</p>

            <p><b>Phone:</b> ${user.phone || "-"}</p>

            <p><b>City:</b> ${user.city || "-"}</p>

            <p><b>State:</b> ${user.state || "-"}</p>

            <p><b>Pincode:</b> ${user.pincode || "-"}</p>

        </div>

        `;

    });

}

// ======================
// LOAD BOOKS
// ======================

async function loadBooks(){

    const snapshot = await getDocs(
        collection(db,"books")
    );

    booksCount.innerText = snapshot.size;

    booksList.innerHTML = "";

    snapshot.forEach(docSnap=>{

        const book = docSnap.data();

        const price =
            book.paperbackPrice ||
            book.hardcoverPrice ||
            book.price ||
            0;

        booksList.innerHTML += `

        <div class="book">

            <h3>${book.title || "Untitled Book"}</h3>

            <p><b>Author:</b> ${book.author || "-"}</p>

            <p><b>Category:</b> ${book.category || "-"}</p>

            <p><b>Price:</b> ₹${price}</p>

            <button onclick="deleteBook('${docSnap.id}')">
                🗑 Delete
            </button>

        </div>

        `;

    });

}

// ======================
// DELETE BOOK
// ======================

window.deleteBook = async function(bookId){

    const confirmDelete = confirm(
        "Delete this book?"
    );

    if(!confirmDelete) return;

    try{

        await deleteDoc(
            doc(db,"books",bookId)
        );

        alert("Book deleted successfully.");

        loadBooks();

    }
    catch(error){

        console.error(error);

        alert("Failed to delete book.");

    }

};

// ======================
// LOAD ORDERS
// ======================

async function loadOrders(){

    const snapshot = await getDocs(
        collection(db,"orders")
    );

    ordersCount.innerText = snapshot.size;

    ordersList.innerHTML = "";

    let totalRevenue = 0;

    snapshot.forEach(docSnap=>{

        const order = docSnap.data();

        totalRevenue += order.total || 0;

        let booksHTML = "";

        if(order.items){

            order.items.forEach(book=>{

                booksHTML += `
                    <p>
                        📖 ${book.title}
                        - ₹${book.price}
                    </p>
                `;

            });

        }

        const date = new Date(order.createdAt);

        ordersList.innerHTML += `

        <div class="order">

            <h3>Order #${docSnap.id.slice(0,8)}</h3>

            <p><b>Date:</b>
                ${date.toLocaleDateString()}
            </p>

            <p><b>User ID:</b>
                ${order.userId}
            </p>

            ${booksHTML}

            <h3>
                Total ₹${order.total}
            </h3>

            <select
                onchange="updateStatus('${docSnap.id}',this.value)"
            >

                <option
                    ${order.status==="Processing"?"selected":""}>
                    Processing
                </option>

                <option
                    ${order.status==="Packed"?"selected":""}>
                    Packed
                </option>

                <option
                    ${order.status==="Shipped"?"selected":""}>
                    Shipped
                </option>

                <option
                    ${order.status==="Out for Delivery"?"selected":""}>
                    Out for Delivery
                </option>

                <option
                    ${order.status==="Delivered"?"selected":""}>
                    Delivered
                </option>

            </select>

        </div>

        `;

    });

    revenue.innerText = "₹" + totalRevenue;

}

// ======================
// UPDATE STATUS
// ======================

window.updateStatus = async function(orderId,status){

    try{

        await updateDoc(
            doc(db,"orders",orderId),
            {
                status:status
            }
        );

        alert("Order updated.");

    }
    catch(error){

        console.error(error);

        alert("Failed to update order.");

    }

};
