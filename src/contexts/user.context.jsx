import { createContext, useEffect, useReducer} from "react"; //createContext is a function that helps you share data (like state or functions)
//  globally across your component tree without having to pass props down manually at every level.

import { createAction } from "../utils/reducer/reducer.utils";

import { onAuthStateChangedListener , createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//The reason why I want to do onAuthStateChangedListener in user context is because the majority of the code that has to do with
//  fetching and keeping track of what the user value is should probably be kept in the place where we're also storing it.

//as the actual value you want to access

//context still is context, because the context is what values that we expose.
// The only difference now is that how we are storing current user is a little different.
// We're not using you state to store that value anymore.We're now using a reducer.


export const UserContext = createContext({
    //default value
    currentUser:null,
    setCurrentUser:()=> null,
});



//NOTE:(IN useEffect)No array → keeps running on every render (good for syncing but can cause performance issues).
//Empty array → runs only once, like componentDidMount.


//REDUCERS =>A reducer always returns a new state object Not JSX, not actions, not booleans.
// with the same structure as the previous state, 
// containing updated values based on the action.

//Why do we return a NEW object?
// Because state must be immutable.

// these reducers change the object that we get back and the properties 
// and the values inside them based on the action.

//dispatch(action) → reducer(currentState, action) → returns newState → UI Re-render

//“State is the current snapshot of the app data, 
// action is an object describing what happened, and 
// the reducer returns the new state based on the action.”

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER:'SET_CURRENT_USER'
}

const userReducer = (state,action) => {
    //initially state will be null
    console.log('dispatched');
    console.log(action);
    //state => current state of application
    //comes from previous reducer return, read-only, never change state directly.

    //action => plain JS object that describes what happened with two keys:
    //1) type => mandatory
    //2) payload => optional
    //Actions do NOT change state themselves


    //
    const {type,payload} = action;
    switch(type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state, 
                currentUser:payload
                //This is when state object have multiple values,
                //Copies all existing properties of the state,Ensures immutability,
                // Prevents losing other state values
                //always return an object that spreads to the previous
                // state and then just update the relevant values that you care about.
            }
       default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
    
}

const INITIAL_STATE = {
    currentUser:null
}

export const UserProvider = ({ children }) =>
{
    const [state,dispatch] = useReducer(userReducer,INITIAL_STATE); 
    //useReducer returns an array [state,dispatch].
    //userReducer always returns a new state. react calls it when dispatch is called
    //INITIAL_STATE=> used only during initialisation on first render,
    //then new state comes from reducer 
    //When DOES userReducer run?
    //ONLY when dispatch is called

    const { currentUser } = state;
    console.log(currentUser);
    const setCurrentUser = (user) => {
        //dispatch is returned by useReducer
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
    }
    //if you want this user reducer to receive an action, you have to call dispatch and 
    // dispatch will take that action and then pass it in, 
    // where I will then run through the switch statement and update the reducer accordingly.
    //Whenever dispatch gets called and a new state object is returned,
    //  then we also will rerun this functional component.
    const value = {currentUser,setCurrentUser};
    

    //This useEffect registers a Firebase auth listener on mount and returns the unsubscribe function 
    // so React can clean up the listener when the component unmounts, preventing memory leaks and duplicate subscriptions.
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user)
            {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            //centralized our sign out and sign in into this listener callback.
            //if user signs out, we get null
            //if user signs in, we get user obj
        });

        return unsubscribe;
    },[]) //giving empty dependancy array meaning, want to run this function once when the component mounts.
    //this is the actual functional component


    //So on every context that gets built for us, there is a dot provider and the dot provider is the component 
    // that will wrap around any other components that need access to the values inside.
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    //Provider allows any children to access the values inside of useState.
}
