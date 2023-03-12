import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZRv2f5DK99b6Ds6sncwb2x-RpQj0p2oY",
  authDomain: "workmate-f16c4.firebaseapp.com",
  projectId: "workmate-f16c4",
  storageBucket: "workmate-f16c4.appspot.com",
  messagingSenderId: "72265886351",
  appId: "1:72265886351:web:0c34b788a4ff13265e5efa",
  measurementId: "G-22P60SXX90",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
