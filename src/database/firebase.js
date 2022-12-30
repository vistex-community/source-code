import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_gUVqLDhifwZ7L3dv_EYWmADIYpG0KNE",
  authDomain: "community-vistex.firebaseapp.com",
  projectId: "community-vistex",
  storageBucket: "community-vistex.appspot.com",
  messagingSenderId: "898450849630",
  appId: "1:898450849630:web:741d2c813857ba954999cf",
  measurementId: "G-0P0TXGWDFP",
};

const app = initializeApp(firebaseConfig); //Initialize the firebase app

const database = getFirestore(app); //Initialize database/service
export const auth = getAuth(app); //Initialize Auth Service
export default database;
