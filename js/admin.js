import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const usersList = document.getElementById("usersList");
const ordersList = document.getElementById("ordersList");

async function loadUsers(){

const querySnapshot = await getDocs(collection(db,"users"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");

div.innerHTML = `
<p>
<b>${data.name}</b><br>
${data.email}<br>
${data.phone}<br>
${data.city}
</p>
<hr>
`;

usersList.appendChild(div);

});

}

async function loadOrders(){

const querySnapshot = await getDocs(collection(db,"orders"));

querySnapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");

div.innerHTML = `
<p>
<b>${data.book}</b><br>
${data.userName}<br>
${data.phone}<br>
${data.city}
</p>
<hr>
`;

ordersList.appendChild(div);

});

}

loadUsers();
loadOrders();
