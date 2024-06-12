// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ac904.firebaseapp.com",
  projectId: "mern-blog-ac904",
  storageBucket: "mern-blog-ac904.appspot.com",
  messagingSenderId: "295783220825",
  appId: "1:295783220825:web:dc814207acc9b694775348",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


