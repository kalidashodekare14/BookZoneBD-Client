// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyEFuwwVr0pA0djsWS5Y6n2BKp-TFij8M",
    authDomain: "bookzonebd-1.firebaseapp.com",
    projectId: "bookzonebd-1",
    storageBucket: "bookzonebd-1.firebasestorage.app",
    messagingSenderId: "598865643699",
    appId: "1:598865643699:web:e01d95d807998dc6d688c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth