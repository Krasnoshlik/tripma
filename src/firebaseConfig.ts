import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYUfx10x3z0zs9mwU3ggZN3EcR3O0kgB4",
  authDomain: "tripma-167a5.firebaseapp.com",
  projectId: "tripma-167a5",
  storageBucket: "tripma-167a5.appspot.com",
  messagingSenderId: "1067730570387",
  appId: "1:1067730570387:web:1586313bdb35991d9b1166",
  measurementId: "G-192LQ33NYW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
