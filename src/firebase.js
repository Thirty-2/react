import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeBKQLTwm1GD_BfTO8grsoxUi-OWvXEHs",
  authDomain: "artisans-83c21.firebaseapp.com",
  projectId: "artisans-83c21",
  storageBucket: "artisans-83c21.firebasestorage.app",
  messagingSenderId: "542479045250",
  appId: "1:542479045250:web:0e97a782d5800a097dda9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);