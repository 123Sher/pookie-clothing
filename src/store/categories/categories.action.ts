import { createAction, Action, ActionWithPayload} from "../../utils/reducer/reducer.utils"; 
import { CATEGORIES_ACTION_TYPES, Category} from "./categories.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';


//used inside Shop.component.js
//getCategoriesAndDocuments() →  setCategories(data) → dispatch() → reducer sets state
//(fetches from Firestore)  (wraps data in action) (sends to Redux) c (components re-render)
//export const setCategories = (categoriesArray) => 
    //createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES,categoriesArray);


export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCEED,Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;



// All three below methods are synchronous and not even thunk.
// With Thunk ✅
//Thunk teaches Redux to accept functions instead of just plain objects. So now you can do:
export const fetchCategoriesStart = ():FetchCategoriesStart => {
   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export const fetchCategoriesSuccess = (categoriesArray:Category[]):FetchCategoriesSuccess => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCEED,categoriesArray);
}

export const fetchCategoriesFailed = (error:Error):FetchCategoriesFailed => {
   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error)
}

// Replace 'any' with your actual RootState type if you have one
type MyThunkDispatch = ThunkDispatch<any, any, UnknownAction>;

//Inside fetchCategoriesAsync, Redux passes its OWN dispatch:
//Inside thunk | Actually updates Redux state via reducer
//thunk is going to be a action that we say to fetch categories.
//a function that returns a function that gets a dispatch
//before this, dispatch was happening in shop.component.jsx
//we have moved all the synchronous and loading code into thunk meaning all asynchronous behavior is 
// all handled by redux.
//in this way shop component no need to maintain any async actions.
//everything now lives in middleware which is separate logic.
export const fetchCategoriesAsync = () => //outer function that Shop.component.jsx calls
    //THUNK MIDDLEWARE automatically calls this
    async (dispatch: MyThunkDispatch) => {  // ← Redux injects dispatch here automatically
    dispatch(fetchCategoriesStart());
    try{
       // Assert the return type to satisfy the action payload requirements
        const categoriesArray = (await getCategoriesAndDocuments()) as Category[];
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error)
    {
        //The most robust approach is to verify that the caught error is an 
        // instance of the Error class before passing it along
        if (error instanceof Error) {
            dispatch(fetchCategoriesFailed(error));
        } else {
            // Fallback for unexpected non-error strings or objects
            dispatch(fetchCategoriesFailed(new Error('An unknown error occurred')));
        }
    }
    
}