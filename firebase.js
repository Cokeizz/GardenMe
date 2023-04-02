// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { DataSnapshot, getDatabase, ref} from 'firebase/database';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6xzr6WKrZUDHyQYaLqiZ-0fL0znxs5hI",
  authDomain: "gardenme-963b3.firebaseapp.com",
  projectId: "gardenme-963b3",
  storageBucket: "gardenme-963b3.appspot.com",
  messagingSenderId: "691793034488",
  appId: "1:691793034488:web:814048f1027b8122e4cf0d",
  measurementId: "G-3DYQMKNVKG"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const tb = getFirestore();

const auth = firebase.auth();

function dbListener(){
  const db = ref(getDatabase(), '/corona');
    onValue(db, (snapshot)=>{
     console.log(snapshot.val());
   })}

   dbListener;


export { auth };