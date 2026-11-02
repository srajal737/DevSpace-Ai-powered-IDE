
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "",
  projectId: "",
  storageBucket:"",
  messagingSenderId: "",
  appId:""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);

export const googleProvider = new GoogleAuthProvider();






