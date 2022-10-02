// Importation from Config
import { app } from "./firebase-config.js";
import { analytics } from "./firebase-config.js";
import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";

// Importation from CDN
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  addDoc,
  collection,
  Timestamp, getDocs, where, query
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// login
let emailLogin = document.querySelector("#email-login");
let passwordLogin = document.getElementById("pass-login");
let loginBtn = document.querySelector("#login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

function login(){
  signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
}

// signup

let emailSignup = document.querySelector("#email-signup");
let passSignup = document.querySelector("#pass-signup");
let signupBtn = document.querySelector("#signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", signup);
}
function signup() {
  createUserWithEmailAndPassword(auth, emailSignup.value, passSignup.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // const userUid = user.uid
      addDoc(collection(db, "users"), {
        email: emailSignup.value,
        password: passSignup.value,
        // userUid: userUid
      });
      // ...
      emailSignup.value = "";
      passSignup.value = "";
    })
    .catch((error) => {
      // const errorCode = error.code;
      console.log(error);
      // const errorMessage = error.message;
      // ..
    });
}

// verification
// email verification function
let emailVerifyBtn = document.getElementById("verify-email");
let functionStatus = document.getElementById("status")
if(emailVerifyBtn){
  emailVerifyBtn.addEventListener("click" , async function verifyEmail(){
    try{
      await sendEmailVerification(auth.currentUser);
    console.log('please check your email address and confirm.')
    functionStatus.innerHTML = `Verification Link has been sent to your email`
  }catch(e){
    // console.log(`error===> ${e}`)
    // console.log(e)
    functionStatus.innerHTML = `${e.code}`
  }
  })
  }

  // todo

let todoInp = document.querySelector("input#todoAdd")
let addTodoBtn = document.querySelector("#add-todo")
if(addTodoBtn){
  onAuthStateChanged(auth, (user) => {
    if(user){
      const uid = user.uid
       addTodoBtn.addEventListener("click" , ()=>{
        addDoc(collection(db, "todos"), {
          todo: todoInp.value,
          email: user.email,
          uid: uid
          // userUid: userUid
        });
       })
       console.log("user found")
      }else{
        console.log("user Signed Out")
      }
  })
}

// signout

let signOutBtn = document.querySelector("#signout-btn")
if(signOutBtn){
  signOutBtn.addEventListener("click" , ()=>{
    signOut(auth).then(() => {
  
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });   
    })
}

async function fetchTodos() {
  // console.log("fetchTodos", auth.currentUser.uid);
  let collectionRef = collection(db, "todos");
  let condition = where("uid", "==", auth.currentUser.uid);

  const q = query(collectionRef, condition);

  let allTodosSnapshot = await getDocs(q);

  allTodosSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().todo);
      // ul.innerHTML = ul.innerHTML + `<li id=${doc.id}>${doc.data().todo}</li>`
  });
}

let fetchTodoBtn = document.querySelector("#fetch-btn")
if(fetchTodoBtn){
  fetchTodoBtn.addEventListener("click" , fetchTodos)
}