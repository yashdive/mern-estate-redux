// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Load environment variables from .env
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mean-estate-401fd.firebaseapp.com",
  projectId: "mean-estate-401fd",
  storageBucket: "mean-estate-401fd.appspot.com",
  messagingSenderId: "99561158005",
  appId: "1:99561158005:web:59ab91be81b237875bcf3c",
  measurementId: "G-RB0L8997CC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);