import { useState } from "react"; 
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";


const defaultFromFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const dispatch = useDispatch();
    const [fromFields, setFromFields] = useState(defaultFromFields);
    const { email, password } = fromFields;
    // console.log(fromFields);
    const resetFormFields = () => {
        setFromFields(defaultFromFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try { 
            dispatch(emailSignInStart(email, password));
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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    {/* by default buttons are of type of submit inside of the form, need to change the type as button*/}
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}
export default SignInForm;