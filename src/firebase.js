// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM3SDhVAp-TF9R2cd1PxEk4xpSB0GQXp8",
  authDomain: "realtor-clone-react-73220.firebaseapp.com",
  projectId: "realtor-clone-react-73220",
  storageBucket: "realtor-clone-react-73220.appspot.com",
  messagingSenderId: "486349381924",
  appId: "1:486349381924:web:931a0a9382690a069cd3b1",
  measurementId: "G-ZTTWXHT8QJ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore();
