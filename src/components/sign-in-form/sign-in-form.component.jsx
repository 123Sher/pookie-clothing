//import { useState, useContext } from "react";
import { useState } from "react";

import FormInput from '../form-input/form-input.component';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';
import Button from '../button/button.component';

//import { UserContext } from "../../contexts/user.context";
//this UserContext object is going to give back the value passed in contexts.jsx in line no:20

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () =>
{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        //authentication state is managed globally by Redux, 
        // your component simply needs to await the popup so the authentication
        //  state updates inside Firebase:


        // Just trigger the popup. 
        // Your onAuthStateChangedListener will automatically detect this,
        // create the user document, and dispatch safeUser to Redux!
        try {
            // Await the popup execution completely
            const { user } = await signInWithGooglePopup();
            console.log("Authenticated successfully via Firebase:", user);
        } catch (error) {
            console.error("Google Sign-In failed:", error);
        }
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password); // whenever user
            // signs in, we want to actually take this user object and store it inside the context.
            //setCurrentUser(user);
            resetFormFields();
        }
        catch(error){
            switch(error.code)
            {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) =>
    {
        const {name,value} = event.target; //line is using object destructuring to extract the name attribute and 
        //current value of input field.
        //We use object destructuring instead of array destructuring in this line because 
        // event.target is an object, not an array.
        setFormFields({...formFields, [name]: value });
        //Since state in React must be updated immutably, Copies all existing values from formFields.
        // Replaces or adds a property whose key is the value of name and whose value is value.


    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
               <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                    {/* by default the type of Button is 'submit' inside form and therefore when signing in through google popup, 
                    error comes when already user fills in the form with another account.hence giving type as 'button'
                    */}
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;


//The flow of sign-in
//when user signs-in, we get the response destructions, the user stores it into the context
//console.log in navigation component
//