import { useState, useContext } from "react";
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";

import {UserContext} from '../../context/user.context';

import './sign-up.style.scss';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password do not match");
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email alreafy in use');
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type="text" 
                    name="displayName" 
                    onChange={handleChange}
                    value={displayName}
                    required
                />

                <FormInput 
                    label='Email'
                    type="email" 
                    name="email" 
                    onChange={handleChange}
                    value={email}
                    required
                />

                <FormInput 
                    label='Password'
                    type="password" 
                    name="password" 
                    onChange={handleChange}
                    value={password}
                    required
                />

                <FormInput 
                    label='Confirm Password'
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;