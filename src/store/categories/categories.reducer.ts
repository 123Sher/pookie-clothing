import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { UnknownAction } from 'redux';


export interface CategoriesState {
    readonly categories: CATEGORIES_ACTION_TYPES[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};


export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE,action: UnknownAction = { type: '' }) => {
    const {type,payload} = action;

    switch (type){
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {...state,isLoading:true};
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCEED:
            return {...state,categories:payload,isLoading:false};
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {...state,error:payload,isLoading:false};
        default:
            return state;
    }
}