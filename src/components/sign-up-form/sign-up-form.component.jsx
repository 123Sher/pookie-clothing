//import { useContext, useState } from "react";
import { useState } from "react";
import FormInput from '../form-input/form-input.component';
//import { UserContext } from "../../contexts/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>
{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            alert("Your passswords do not match");
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            //Registers a new user with email and password
            // Signs them in immediately
            // Returns a UserCredential object, which includes a user object
            //setCurrentUser(user); //Whenever user signs up for the first time, they're also going to have their user 
            // set inside  of our user context.
            await createUserDocumentFromAuth(user,{ displayName });
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use')
            {
                alert("Cannot create user email already in use");
            }
            else
            {
                console.log('user creation failed',error);
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;