import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjLr9UqG1oJUpuBRlpSoCWXR5fYVXmJYw",
  authDomain: "ieee-anket.firebaseapp.com",
  databaseURL: "https://ieee-anket-default-rtdb.firebaseio.com",
  projectId: "ieee-anket",
  storageBucket: "ieee-anket.appspot.com",
  messagingSenderId: "853358526830",
  appId: "1:853358526830:web:9f4cbd378b3d75d6e9817f",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { firebaseApp, firebase, auth, db };
