/*import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';*/

import {useEffect} from 'react';
import './authentication.styles.scss'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authentication = () =>
{

    
// Why this is the best approach to navigate from /auth to /shop after login:

// • Declarative: The component automatically keeps watch on the Redux store via useSelector.
// • Instant: The moment your onAuthStateChangedListener finishes dispatching the user into Redux, this component notices the change and changes the page seamlessly.
// • Cleans up the history: If a user is already signed in and accidentally tries to type /auth in the URL bar, this code will immediately bounce them right back to /shop.

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();


    useEffect(() => {
        // // If a user exists in the Redux store, instantly move them to the home page or shop page.
        if(currentUser)
        {
            navigate('/');
        }
    },[currentUser,navigate]);
    // the creators of react-router-dom built useNavigate so that the reference 
    // to the navigate function is memoized. This means its identity remains 
    // completely identical across every single render of your component.
    //  Because its identity never changes, putting it in the dependency array 
    // is 100% safe and will never trigger an accidental re-run.










    //running the below function when the component mounts for first time with empty array.
    // we're going to sign in with the Google redirect.

    //It's then going to take us to that page where we're going to choose our Google user.
    // When we come back, what's going to happen is our application is going to remount meaning.
    // This sign in component will remount because we're coming back to the sign in page 
    // where the sign and component is on Mount.This use effect will run this callback once on the mounting, 
    // and then what's going to happen is that inside this callback, we're going to say, 
    // Hey, get me the response for the redirect that just happened.

    /*useEffect(() =>
    {
        const fetchRedirectResult = async () =>
        {
            try{
                const response = await getRedirectResult(auth);
                console.log(response);
                if(response)
                {
                     const userDocRef = await createUserDocumentFromAuth(response.user);
                }
            }
            catch(error)
            {
                console.log('error getting redirect result', error);
            }
        }
         setTimeout(fetchRedirectResult, 2000);
    },[]);*/
       

    // this is the reason why the auth is singelton 
    // because keep track of all these authentication states that are happening throughout the application.
    
    

    /*const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
       console.log(user); //console does not happen here because Our website does not know since we are redirected completely to 
       //different domain that there was some previous instant of state of this website that we werebeing paused for.
       //after redirection, the application gets reinitialised.
    }*/
   //instead of above code calling signInWithGoogleRedirect directly.

    return (
        
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;