// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD6vk6DYzMNTO7KVVlYSkqxyU-pQm964j4",
  authDomain: "nintynine-99.firebaseapp.com",
  projectId: "nintynine-99",
  storageBucket: "nintynine-99.appspot.com",
  messagingSenderId: "623733408868",
  appId: "1:623733408868:web:79f0349c260b3bb1f68b71",
  measurementId: "G-97WF31DRNZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);