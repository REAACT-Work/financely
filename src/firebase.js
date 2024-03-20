// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc , setDoc } from "firebase/firestore";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQQmWI3pfQ1icXK5CfepNaUY51Zwk7vWI",
  authDomain: "financely-d0d85.firebaseapp.com",
  projectId: "financely-d0d85",
  storageBucket: "financely-d0d85.appspot.com",
  messagingSenderId: "272349719079",
  appId: "1:272349719079:web:929e21d64891c94ab97c02",
  measurementId: "G-LLYGXX8Q1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth =getAuth(app);
const provider =new GoogleAuthProvider();
export { db,auth, provider,doc,setDoc };

