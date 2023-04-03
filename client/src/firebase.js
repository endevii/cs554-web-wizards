import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfySVSi88XWxe8MOjbcioM85tPrayHX0U",
  authDomain: "cs554finalproject-fcbe3.firebaseapp.com",
  projectId: "cs554finalproject-fcbe3",
  storageBucket: "cs554finalproject-fcbe3.appspot.com",
  messagingSenderId: "59575663800",
  appId: "1:59575663800:web:54ea816d7725804a40884d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const user_database = getDatabase(app);
export const auth = getAuth(app);