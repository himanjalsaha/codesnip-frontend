// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT23Ah4hs5z6K7HtuYD08FDWmOwr2aMCM",
  authDomain: "paperease-897e0.firebaseapp.com",
  projectId: "paperease-897e0",
  storageBucket: "paperease-897e0.appspot.com",
  messagingSenderId: "686656111577",
  appId: "1:686656111577:web:50e5b5029b25f44c028fc8",
  measurementId: "G-5MMWPHRNT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)


