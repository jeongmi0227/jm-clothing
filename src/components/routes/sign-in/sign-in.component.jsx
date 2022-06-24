import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth,signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";
import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
    // application will remount, sign in component will remount
    // useEffect will run callback once on the mouting
    // useEffect( () => {
    //     // get the response for the redirect
    //     // based on the auth redirect will hapepen
    //     // auth is singleton, because auth is helping us keep track of all these authentication states are happening throught the application.
    //     // auth is kind of authentication memory back is tracking all of authentication states for websites and firebase instance, regardless of where the website is going.
    //     async function fetchData() {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //         console.log(response);
    //     }
    //     fetchData();
    // }, []);
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Goolge Popup</button>
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Goolge Redirect</button> */}
        </div>
    );
};

export default SignIn;