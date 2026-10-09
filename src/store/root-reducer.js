// combineReducers => method that allows to create final big reducer that can be used inside store 
// by combining smaller reducers together
import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer.js";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer.js";

//name of reducer : actual reducer function
export const rootReducer = combineReducers({
    categories:categoriesReducer,
    user:userReducer,
    cart:cartReducer,
})
//Redux builds the store like:
//state.categories = result of categoriesReducer

//how to dispatch actions?
//to get the value out of store into our application.