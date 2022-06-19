import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// doc method allows us to retrieve documents inside of our firestore database
// getDoc method getting the documents data 
// setDoc method setting the documents data
import {getFirestore,doc, getDoc,setDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCbVy0rM9zc2wvfaD6fkNqT8yRA_SY7egU",
    authDomain: "jm-clothing-db.firebaseapp.com",
    projectId: "jm-clothing-db",
    storageBucket: "jm-clothing-db.appspot.com",
    messagingSenderId: "764324824637",
    appId: "1:764324824637:web:3ba459456fc2ad9fbd8c54"
  };
  

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  
const provder = new GoogleAuthProvider();

provder.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provder);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // check if there is an existing document reference
    // reference is a special type of obejct that firestore uses when talking about acutal instace of a document model
    // arg1 :firestore database instance
    // arg2 : collections
    // arg3 : identifier
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);
}
