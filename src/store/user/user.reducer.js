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

import {USER_ACTION_TYPES} from './user.types';

export const INITIAL_STATE = {
    currentUser:null
}

export const userReducer = (state = INITIAL_STATE,action) => {
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
            //This part of my reducer did not change  
            // because state is an object and it's the exact same previous object in memory, this reducer does not need to update
            return state;
    }
    
}

