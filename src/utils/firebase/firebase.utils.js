import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from 'firebase/auth';
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
  
const googleProvder = new GoogleAuthProvider();

googleProvder.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvder);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvder);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // check if there is an existing document reference
    // reference is a special type of obejct that firestore uses when talking about acutal instace of a document model
    // arg1 :firestore database instance
    // arg2 : collections
    // arg3 : identifier
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);
    // userSnapshot allow us to check whether or not there's an instancee of it that exists inside of a database
    // or also us to access the data.
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    // if user data does not exist
    // create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try { 
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
    // if user data exists
    // return userDocRef

}

export const createAuthUserWithEmailAndPassword = async () => {
    
}