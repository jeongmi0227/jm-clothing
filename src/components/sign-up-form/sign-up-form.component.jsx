import { useState } from "react"; 
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFromFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}
const SignUpForm = () => {
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
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
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
        <div className="sign-up-container">
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
        </div>
    );
}
export default SignUpForm;