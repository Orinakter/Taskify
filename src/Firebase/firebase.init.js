// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTT8zMKznRXLyFi0SZWDLvNyoSKfpmeXg",
    authDomain: "taskify-eb4c7.firebaseapp.com",
    projectId: "taskify-eb4c7",
    storageBucket: "taskify-eb4c7.firebasestorage.app",
    messagingSenderId: "587055236137",
    appId: "1:587055236137:web:51b930ef923164bffe8838"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)