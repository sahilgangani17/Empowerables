// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9k2864ThZmSo31ZeEelY0LwwYb3upgU",
  authDomain: "signlanguage-ac4cd.firebaseapp.com",
  projectId: "signlanguage-ac4cd",
  storageBucket: "signlanguage-ac4cd.appspot.com",
  messagingSenderId: "1054002682901",
  appId: "1:1054002682901:web:37b371acefbf018d4d821c",
  measurementId: "G-P3MEMHB8JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
