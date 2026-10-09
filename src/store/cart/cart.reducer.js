import { CART_ACTION_TYPES } from "./cart.types";

// initial state just gives us the object that we need to keep track of when 
// it comes to what our actual reducer should return.
export const CART_INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false
};


//a reducer should only calculate the next state
// it should NOT decide what should happen in the real world
//a reducer is simply: (previousState, action) → newState
// key rule is same input → same output , no side effects
//Reducers should not handle business logic because reducers must be pure and 
// predictable functions that only compute the next state, without side effects 
// or real-world decisions.
export const cartReducer = (state = CART_INITIAL_STATE,action = {}) => {
    const {type,payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                cartItems:payload
            };
            //create a NEW object
            // copy everything from the old state
            // then overwrite only the fields present in payload
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload,// this will be the new payload value.
            }

        default:
            return state;
    }
}