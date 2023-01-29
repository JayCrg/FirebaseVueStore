import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCcd6_TLOAYjPsurnS8hEAaL4w5hGmlYt8",
  authDomain: "choreslist-6842c.firebaseapp.com",
  projectId: "choreslist-6842c",
  storageBucket: "choreslist-6842c.appspot.com",
  messagingSenderId: "436852831739",
  appId: "1:436852831739:web:1ba6ed0009eaa7216ac75e",
  measurementId: "G-QZLZ913LGR"})

// used for the firestore refs
const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage()

// here we can export reusable database references
// export const todosRef = collection(db, 'todos')