// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4RMfJtMA8L3-9IQJHDfG-shEc3OpLs-A",
  authDomain: "search-home-app.firebaseapp.com",
  projectId: "search-home-app",
  storageBucket: "search-home-app.appspot.com",
  messagingSenderId: "265613741003",
  appId: "1:265613741003:web:dd5a479a811daf33ba044e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//exporting the firestore
export const firestoreDb=getFirestore();
