// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBAcRToP5EqkY471dzCCFpWz7b5zIlTtf8",
//   authDomain: "ai-travel-planner-33be3.firebaseapp.com",
//   projectId: "ai-travel-planner-33be3",
//   storageBucket: "ai-travel-planner-33be3.appspot.com",
//   messagingSenderId: "1061287159267",
//   appId: "1:1061287159267:web:222237dbafa2b8cf12acd6",
//   measurementId: "G-7H41R46XH0"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// // const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
