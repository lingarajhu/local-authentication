import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRzB6tNoTwQCQM9Dh0C3lDUM8n8G6sbpg",
  authDomain: "auth-project-f59e7.firebaseapp.com",
  projectId: "auth-project-f59e7",
  storageBucket: "auth-project-f59e7.appspot.com",
  messagingSenderId: "453683902385",
  appId: "1:453683902385:web:97b2407c2ddb92255bef90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
