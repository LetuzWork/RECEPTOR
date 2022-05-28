import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAGS33GocrVHkowGV8TSzu8jm8RjV_RrI",
  authDomain: "forward-look.firebaseapp.com",
  projectId: "forward-look",
  storageBucket: "forward-look.appspot.com",
  messagingSenderId: "695136357216",
  appId: "1:695136357216:web:961f9292518fc6b3292c05",
  measurementId: "G-8LGZ3574H1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default { app, db };
