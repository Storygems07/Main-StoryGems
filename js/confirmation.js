// js/confirmation.js
import { auth, onAuthStateChanged } from './firebase.js';

// Load current user from localStorage
const user = JSON.parse(localStorage.getItem('currentUser'));
const welcome = document.getElementById('welcomeMsg');
const goHomeBtn = document.getElementById('goHomeBtn');

if(user){
    welcome.textContent = `Hi, ${user.name}!`;
} else {
    // If not logged in, redirect to login
    window.location.href = 'login.html';
}

// Manual button click
goHomeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Auto redirect after 3 seconds
setTimeout(() => {
    window.location.href = 'index.html';
}, 3000);
