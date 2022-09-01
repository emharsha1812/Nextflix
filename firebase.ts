// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyACuHe01CYV6QiktDG3buZ_j2w_OAuXsWA',
//   authDomain: 'nestflicks.firebaseapp.com',
//   databaseURL: 'https://nestflicks-default-rtdb.firebaseio.com',
//   projectId: 'nestflicks',
//   storageBucket: 'nestflicks.appspot.com',
//   messagingSenderId: '353913861079',
//   appId: '1:353913861079:web:c260b6ba9953ae2d0a5192',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAmJmm4MJqQV6sUY3NJkdtoF8zXPJC__HY',
  authDomain: 'nextflicks-773f6.firebaseapp.com',
  databaseURL: 'https://nextflicks-773f6-default-rtdb.firebaseio.com',
  projectId: 'nextflicks-773f6',
  storageBucket: 'nextflicks-773f6.appspot.com',
  messagingSenderId: '373153801144',
  appId: '1:373153801144:web:4e60d1210f2f391f75254d',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
