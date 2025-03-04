import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export { collection, doc, addDoc, getDoc, setDoc, getDocs, query, updateDoc, deleteDoc, where, documentId } from "firebase/firestore";
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
export { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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