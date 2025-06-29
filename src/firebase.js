import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, onSnapshot } from "firebase/firestore"; // Added onSnapshot
import { initializeApp } from "firebase/app";

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

// Initialize GoogleAuthProvider with scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// Auth functions
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Database functions
export const db = getFirestore(app);

export const saveUserToFirestore = async (userId, userData) => {
  await setDoc(doc(db, "users", userId), userData, { merge: true });
};

export const saveArtisanToFirestore = async (userId, artisanData) => {
  await setDoc(doc(db, "artisans", userId), artisanData, { merge: true });
};

export const addJob = async (jobData) => {
  const docRef = await addDoc(collection(db, "jobs"), jobData);
  return docRef.id;
};

export const addArtisan = async (artisanData) => {
  const docRef = await addDoc(collection(db, "artisans"), artisanData);
  return docRef.id;
};

export const getJobs = async () => {
  const querySnapshot = await getDocs(collection(db, "jobs"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getArtisans = async () => {
  const querySnapshot = await getDocs(collection(db, "artisans"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};