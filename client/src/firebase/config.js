// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSaHSzZmDmSQIDRjPMwieU2ETJOTCpuKo",
  authDomain: "noema-ea05c.firebaseapp.com",
  projectId: "noema-ea05c",
  storageBucket: "noema-ea05c.firebasestorage.app",
  messagingSenderId: "1052646436643",
  appId: "1:1052646436643:web:53596c2671c76e575f6696",
  measurementId: "G-NN56DNFWZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
