import { createContext, useReducer } from "react";

import {createAction} from '../utils/reducer/reducer.utils';

//This function returns the updated array but does NOT set state.
const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem)
    {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}
            : cartItem
        )
    }

    //This is how we add a new product to the list without modifying the original one.
    //productToAdd is coming from product card which will be an object and adding new property 'quantity' to it.
    //hence, below line Return a new array that contains all existing cart items, and add the new product with quantity = 1.
    return [...cartItems,{...productToAdd,quantity:1}];
}

const removeCartItem = (cartItems,cartItemToRemove) =>
{
     const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id); 
     // existingCartItem is an object that needs to be removed

     if(existingCartItem.quantity === 1)
     {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
     }
     //returns A new array of objects containing all items EXCEPT the one you are removing.
     return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}
            : cartItem
            //we're always creating a new object using spread operator because,
            //React expects you to NEVER change (mutate) the existing state directly.
            //Instead, you must create a new copy of the state every time you update something.
            //Because React decides whether to re-render a component based on whether the state object’s MEMORY REFERENCE changed.
            //cartItem.quantity = cartItem.quantity + 1; is not allowed because this keeps the SAME OBJECT in memory.
            //Immutability means you don’t change the old state — you replace it with a new one.
        )

    //Since return exits the entire function immediately, each branch returns independently.
    //The filter() return happens only when quantity is 1.
    // The map() return happens only when quantity is > 1.
    // They never both run.

}

const clearCartItem = (cartItems,cartItemToClear) =>
{
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext(
    {
        isCartOpen:false,
        setIsCartOpen: () => {},
        cartItems:[],
        addItemToCart: () => {},
        cartCount: 0,
        removeItemFromCart: () => {},
        clearItemFromCart: () => {},
        cartTotal:0,
    }
);

// initial state just gives us the object that we need to keep track of when 
// it comes to what our actual reducer should return.
const INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false
};

const CART_ACTION_TYPES = {
    'SET_CART_ITEMS':'SET_CART_ITEMS',
    'SET_IS_CART_OPEN':'SET_IS_CART_OPEN'
}
//a reducer should only calculate the next state
// it should NOT decide what should happen in the real world
//a reducer is simply: (previousState, action) → newState
// key rule is same input → same output , no side effects
//Reducers should not handle business logic because reducers must be pure and 
// predictable functions that only compute the next state, without side effects 
// or real-world decisions.
const cartReducer = (state,action) => {
    const {type,payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
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
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}
//addCartItem() = pure function → takes input, gives output
//setCartItems() = state updater → tells React to update UI

export const CartProvider = ({ children }) => {
    
    const [{cartItems,cartTotal,cartCount,isCartOpen},dispatch] = useReducer(cartReducer,INITIAL_STATE);
    // in general, const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    // therefore here, const { cartItems, cartTotal, cartCount, isCartOpen } = state;
    //destructuring the state object and dispatch function
    //useReducer returns [
    /*{
        cartItems: [],
        cartTotal: 0,
        cartCount: 0,
        isCartOpen: false
    },
    dispatchFunction
    ]*/ 

    //tells the reducer to store all of them in state.
    //and dispatches to reducer
    //does NOT change state directly , only sends an action to the reducer
    // real state update happens inside cartReducer
    const updateCartItemsReducer = (newCartItems) =>
    {
        const newCartCount =  newCartItems.reduce(
            (total,cartItem) => total + cartItem.quantity , 
        0);

        const newCartTotal = newCartItems.reduce(
            (total,cartItem) => total + cartItem.price ,
        0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
            cartItems:newCartItems,
            cartCount:newCartCount,
            cartTotal:newCartTotal,
        }));
    }

    //triggers when user click 'add to cart' button
    const addItemToCart = (productToAdd) =>
    {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);   
    }

    const removeItemFromCart = (cartItemToRemove) =>
    {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);   
    }

    const clearItemFromCart = (cartItemToClear) =>
    {
        const newCartItems = clearCartItem(cartItems,cartItemToClear);
        updateCartItemsReducer(newCartItems);   
    }

    const setIsCartOpen = (bool) => 
    {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool)
        );
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,clearItemFromCart,cartItems,cartCount,cartTotal,};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
    //children = whatever you wrap the provider around.
    // If you wrap <App /> inside <CartProvider>, 
    // then: children = <App /> and everything inside App.
    // So value is the shared data + functions that your Cart Context wants to expose.
    //Whatever inside this object becomes available globally to any component using this context.
    //children = who can access the data
    //value = the data they can access
}

/*UI click
   ↓
addItemToCart()
   ↓
addCartItem()   (pure logic function)
   ↓
updateCartItemsReducer()
   ↓
dispatch()
   ↓
cartReducer()
   ↓
new state
   ↓
Context Provider re-renders
   ↓
All consumers get updated cart*/