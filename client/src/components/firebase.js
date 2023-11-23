// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtj2CKEXP3F9gQxmhRNHApDAikm6hJS1Q",
  authDomain: "bookanoffice-47b76.firebaseapp.com",
  projectId: "bookanoffice-47b76",
  storageBucket: "bookanoffice-47b76.appspot.com",
  messagingSenderId: "363318760114",
  appId: "1:363318760114:web:c531dd77152ff201aa2fab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);