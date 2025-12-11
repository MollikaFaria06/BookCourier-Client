// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDloEbPHZRjlhUCQJiB8Zy_zsgRmJ1VvSY",
  authDomain: "bookcourier-bd993.firebaseapp.com",
  projectId: "bookcourier-bd993",
  storageBucket: "bookcourier-bd993.firebasestorage.app",
  messagingSenderId: "1053226796282",
  appId: "1:1053226796282:web:1baf500908fe74d3df7543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);