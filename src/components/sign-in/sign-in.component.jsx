import { useState, useContext} from "react";
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {UserContext} from '../../context/user.context';

import './sign-in.style.scss';


import { 
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

//Functions
const signInWithGoogle = async () => {
    try {
        await signInWithGooglePopup();
        
    } catch (error) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                alert('No Auth');
                break;
            default:
        }
        
    }
    
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
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
        
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user);
            
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
            }
            
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button 
                        buttonType={BUTTON_TYPE_CLASSES.google}  
                        type='button' 
                        onClick={signInWithGoogle} 
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;