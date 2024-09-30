import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB-xHOY-hwmCvYCLR_a0pupGJqLB_ZZRyw",
    authDomain: "stresstracker-24bbc.firebaseapp.com",
    projectId: "stresstracker-24bbc",
    storageBucket: "stresstracker-24bbc.appspot.com",
    messagingSenderId: "509365316615",
    appId: "1:509365316615:web:d1c949b1400551ea2bcea2",
    measurementId: "G-LSNQV1P0JK"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
