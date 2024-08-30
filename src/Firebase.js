// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4dCrV6B5GYraqkFm16oQlqMwU8LMNh3E",
  authDomain: "ybregister.firebaseapp.com",
  projectId: "ybregister",
  storageBucket: "ybregister.appspot.com",
  messagingSenderId: "720962763966",
  appId: "1:720962763966:web:dddb0e131241ee883d32ef",
  measurementId: "G-PGV59ZJ7WM" // Optional if not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
