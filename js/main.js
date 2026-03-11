import { 
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
updateProfile
} from './firebase.js';


const signupForm = document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const address = document.getElementById("address").value.trim();
const city = document.getElementById("city").value.trim();
const state = document.getElementById("state").value.trim();
const pincode = document.getElementById("pincode").value.trim();

const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

const signupError = document.getElementById("signupError");

signupError.style.display="none";

if(password!==confirmPassword){

signupError.innerText="Passwords do not match";
signupError.style.display="block";
return;

}

if(password.length<6){

signupError.innerText="Password must be at least 6 characters";
signupError.style.display="block";
return;

}

try{

const userCredential = await createUserWithEmailAndPassword(auth,email,password);

await updateProfile(userCredential.user,{
displayName:name
});

const userData = {
name,
email,
phone,
address,
city,
state,
pincode
};

localStorage.setItem("userProfile", JSON.stringify(userData));

alert("Signup successful!");

window.location.href="login.html";

}catch(error){

signupError.innerText=error.message;
signupError.style.display="block";

}

});

}



const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email=document.getElementById("loginInput").value.trim();
const password=document.getElementById("loginPassword").value;

let loginError=document.getElementById("loginError");

if(!loginError){

loginError=document.createElement("p");
loginError.className="auth-error";
loginForm.prepend(loginError);

}

loginError.style.display="none";

try{

const userCredential = await signInWithEmailAndPassword(auth,email,password);

const user=userCredential.user;

localStorage.setItem("currentUser", JSON.stringify({

email:user.email,
name:user.displayName || user.email.split("@")[0]

}));

alert("Login successful!");

window.location.href="books.html";

}catch(error){

loginError.innerText=error.message;
loginError.style.display="block";

}

});

}



function logout(){

signOut(auth).then(()=>{

localStorage.removeItem("currentUser");

window.location.href="login.html";

});

}

export {logout};
