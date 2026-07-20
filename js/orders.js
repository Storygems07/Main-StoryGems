import {
    auth,
    db,
    onAuthStateChanged
} from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const container = document.getElementById("ordersContainer");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            container.innerHTML = `
                <div class="empty">
                    <h2>📦 No Orders Yet</h2>
                    <p>Looks like you haven't ordered any books.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = "";

        snapshot.forEach(docSnap => {

            const order = docSnap.data();

            let booksHTML = "";

            order.items.forEach(book => {

                booksHTML += `
                    <div class="book">
                        <h4>${book.title}</h4>
                        <p>Author: ${book.author}</p>
                        <p>₹${book.price}</p>
                    </div>
                `;

            });

            const date = new Date(order.createdAt);

            container.innerHTML += `

            <div class="order">

                <h3>Order #${docSnap.id.slice(0,8)}</h3>

                <p><b>Date:</b> ${date.toLocaleDateString()}</p>

                ${booksHTML}

                <h3 style="margin-top:15px;">
                    Total : ₹${order.total}
                </h3>

                <div class="status">
                    ${order.status}
                </div>

            </div>

            `;

        });

    }
    catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="empty">
                Failed to load orders.
            </div>
        `;

    }

});
