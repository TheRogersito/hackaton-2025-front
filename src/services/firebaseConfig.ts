import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export { collection, doc, addDoc, getDoc, setDoc, getDocs, query, updateDoc, deleteDoc, where, onSnapshot, documentId } from "firebase/firestore";
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
export { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv8YGMC7IESRf8VO2-AGBDakP7W9sBeTs",
  authDomain: "red-button-firebase.firebaseapp.com",
  projectId: "red-button-firebase",
  storageBucket: "red-button-firebase.firebasestorage.app",
  messagingSenderId: "18589363559",
  appId: "1:18589363559:web:07b416aee89ce4b99b53c2"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);


export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        return result.user;
    });
}

export const logout = async () => await signOut(auth);