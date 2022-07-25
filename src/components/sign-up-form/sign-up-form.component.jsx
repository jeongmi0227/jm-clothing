import { useState } from "react"; 
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from './sign-up-form.styles';
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";

const defaultFromFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}
const SignUpForm = () => {
    const dispatch = useDispatch();
    const [fromFields, setFromFields] = useState(defaultFromFields);
    const { displayName, email, password, confirmPassword } = fromFields;

    // console.log(fromFields);
    const resetFormFields = () => {
        setFromFields(defaultFromFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        // confirm password matches confirm
        // if whether auth
        // create userdoc
        if (password !== confirmPassword) {
            alert('passwords do not match!!');
            return;
        } 

        try {

            dispatch(signUpStart(email, password, displayName));
            
            resetFormFields();
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log(error);
            }
            console.log('user creation encountered an error',error);
        }
   
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFromFields({ ...fromFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions={{
                        type: "text",
                        required:true,
                        onChange: handleChange,
                        name: "displayName",
                        value: displayName,
                    }}/>

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

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type:"password",
                        required:true,
                        onChange:handleChange,
                        name:"confirmPassword",
                        value:confirmPassword,
                    }}/>
                <Button type="submit">SIGN UP</Button>
            </form>
        </SignUpContainer>
    );
}
export default SignUpForm;