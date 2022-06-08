// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyACuHe01CYV6QiktDG3buZ_j2w_OAuXsWA',
  authDomain: 'nestflicks.firebaseapp.com',
  databaseURL: 'https://nestflicks-default-rtdb.firebaseio.com',
  projectId: 'nestflicks',
  storageBucket: 'nestflicks.appspot.com',
  messagingSenderId: '353913861079',
  appId: '1:353913861079:web:c260b6ba9953ae2d0a5192',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
