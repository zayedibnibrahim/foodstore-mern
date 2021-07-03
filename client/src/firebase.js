import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDP9op1gs3qeejtFPs7sQz7TbOZUwgWxn0',
  authDomain: 'food-store-add09.firebaseapp.com',
  projectId: 'food-store-add09',
  storageBucket: 'food-store-add09.appspot.com',
  messagingSenderId: '295290105249',
  appId: '1:295290105249:web:d3478f4131871f8261efe0',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
