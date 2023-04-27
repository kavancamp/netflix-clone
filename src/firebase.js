import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase_api_key from ".env";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: "netflix-clone-9bab9.firebaseapp.com",
  projectId: "netflix-clone-9bab9",
  storageBucket: "netflix-clone-9bab9.appspot.com",
  messagingSenderId: "622111214692",
  appId: "1:622111214692:web:9488d2d56152fa75cb2371",
  measurementId: "G-ST040X5CX6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
