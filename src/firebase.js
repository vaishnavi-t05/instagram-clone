import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQ8AqZz139t1pHJidG5OltZXT0Ln04KlM",
  authDomain: "instagram-clone-a4804.firebaseapp.com",
  projectId: "instagram-clone-a4804",
  storageBucket: "instagram-clone-a4804.firebasestorage.app",
  messagingSenderId: "247273334538",
  appId: "1:247273334538:web:21676e43afcb5746f57cf3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);