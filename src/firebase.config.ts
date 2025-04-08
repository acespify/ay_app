// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-YLG3LicY5pIHZTLJWI_l41JzynKvEhA",
  authDomain: "ay-app-db75a.firebaseapp.com",
  projectId: "ay-app-db75a",
  storageBucket: "ay-app-db75a.firebasestorage.app",
  messagingSenderId: "245806129882",
  appId: "1:245806129882:web:0c876651b7e508c3047be3",
  measurementId: "G-HJ7G92NBHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);