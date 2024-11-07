// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAcRToP5EqkY471dzCCFpWz7b5zIlTtf8",
  authDomain: "ai-travel-planner-33be3.firebaseapp.com",
  projectId: "ai-travel-planner-33be3",
  storageBucket: "ai-travel-planner-33be3.appspot.com",
  messagingSenderId: "1061287159267",
  appId: "1:1061287159267:web:222237dbafa2b8cf12acd6",
  measurementId: "G-7H41R46XH0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);