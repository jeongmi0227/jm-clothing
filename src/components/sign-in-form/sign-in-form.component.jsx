import { useState } from "react"; 
import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFromFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [fromFields, setFromFields] = useState(defaultFromFields);
    const { email, password } = fromFields;
    // console.log(fromFields);
    const resetFormFields = () => {
        setFromFields(defaultFromFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFromFields({ ...fromFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    inputOptions={{
                        type:"email",
                        required:true,
                        onChange:handleChange,
                        name:"email",
                        value:email,
                }} />

                <FormInput
                    label="Password"
                    inputOptions={{
                        type:"password",
                        required:true,
                        onChange:handleChange,
                        name:"password",
                        value:password,
                    }} />
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    {/* by default buttons are of type of submit inside of the form, need to change the type as button*/}
                    <Button type='button' onClick={ signInWithGoogle} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;