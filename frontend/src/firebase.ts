// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY6d3F1Jqc0a84Lv71NGam6p9Ot8_-_nQ",
  authDomain: "calx-73f7f.firebaseapp.com",
  projectId: "calx-73f7f",
  storageBucket: "calx-73f7f.firebasestorage.app",
  messagingSenderId: "1050074580146",
  appId: "1:1050074580146:web:fc78fa6a27b0122cdf75ab",
  measurementId: "G-SSQWJ3ZSE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);