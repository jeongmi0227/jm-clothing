import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
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

    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Goolge Redirect</button> */}
        </AuthenticationContainer>
    );
};

export default Authentication;