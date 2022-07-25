import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
// Observable listener is a way for us to hook into some kind of stream of events
// Whether these events are seen at events or sign out events were actually able to trigger somethign based on these changes.


// doc method allows us to retrieve documents inside of our firestore database
// getDoc method getting the documents data 
// setDoc method setting the documents data
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';


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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    // Get Collection reference even if does not exist
    const collectionRef = collection(db, collectionKey);
    // transactions successful units of work 
    // batch 
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // console.log(docRef);
        batch.set(docRef,object);
    });
    
    await batch.commit();
    console.log('Batch commit');
}
// isolate third party to maintenance
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    // can get snapshot
    const q = query(collectionRef);
    // await Promise.reject(new Error('new error'));
    // getDocs asynchronous ability to fetch document snapshot that we want.
    const querySnapShot = await getDocs(q);

    // return categories as an array
    return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());

    // return an array of individual document and snapshot that actual data themselves
    // const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    // return categoryMap;
    

}

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if (!userAuth) return;
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
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    // return userDocRef;
    // if user data exists
    // return userDocRef

    // Data lives on the snapshot
    // The document reference is just a pointer to that sapce where that data could live.
    // return snapshot here so that we can get the data and store it inside of our reducer.
    return userSnapshot;

}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}    

export const signOutUser = async () => await signOut(auth);

// when user signs in or signs out the callback will be invoked whenever a user authenticates in and whenever an 
// authentication out.
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};