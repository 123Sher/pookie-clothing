import { CART_ACTION_TYPES } from "./cart.types";

import { createAction } from '../../utils/reducer/reducer.utils'; 


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


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean)



//triggers when user click 'add to cart' button
export const addItemToCart = (cartItems,productToAdd) =>
{
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const removeItemFromCart = (cartItems,cartItemToRemove) =>
{
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)   
}

export const clearItemFromCart = (cartItems,cartItemToClear) =>
{
    const newCartItems = clearCartItem(cartItems,cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems) 
}