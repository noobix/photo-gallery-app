// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAovyeE42spSPikEMrqYhKaZCtks0tLN3I",
  authDomain: "emerse-photo-gallery.firebaseapp.com",
  projectId: "emerse-photo-gallery",
  storageBucket: "emerse-photo-gallery.appspot.com",
  messagingSenderId: "707862424571",
  appId: "1:707862424571:web:bbce1c7506526ba3c4795e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
