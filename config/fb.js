import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import "firebase/storage"


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCc1fmlmAipfNjCy3Eh2Q5YLUdabDXF418",
  authDomain: "todolist-5a475.firebaseapp.com",
  projectId: "todolist-5a475",
  storageBucket: "todolist-5a475.appspot.com",
  messagingSenderId: "788338043951",
  appId: "1:788338043951:web:ead99aac8904051b8beada",
  measurementId: "G-Q9GXJ7CT6B"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();