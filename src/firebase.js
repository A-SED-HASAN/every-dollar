// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2cI6Vl6Tc0HHFOED0-1mK95J0QCM6-14',
  authDomain: 'every-dollar.firebaseapp.com',
  databaseURL: 'https://every-dollar-default-rtdb.firebaseio.com',
  projectId: 'every-dollar',
  storageBucket: 'every-dollar.appspot.com',
  messagingSenderId: '36469855675',
  appId: '1:36469855675:web:f4e7c40dd8f06829a1e09e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
