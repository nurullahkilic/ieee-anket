import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9AqQ2qYPoUnsv0MnIXdQ3LPvfVLXAHxI",
  authDomain: "ieee-anket-b0207.firebaseapp.com",
  projectId: "ieee-anket-b0207",
  storageBucket: "ieee-anket-b0207.appspot.com",
  messagingSenderId: "915879820277",
  appId: "1:915879820277:web:3df4fa161af124f636bebc",
  measurementId: "G-P47PMJ3LF4",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { firebaseApp, firebase, auth, db };
