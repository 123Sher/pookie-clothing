import { UnknownAction } from "redux";
// UnknownAction => state management library, TS type that represents an action whose property is type
//In Redux, an action is simply an object that describes something that happened.
//When a reducer receives an action, it doesn't know which action it is yet.
//With UnknownAction:TypeScript only lets you safely access:action.type 

//FUNCTION OVERLOADING => provides us the ability to write multiple function type definitions of the same name
//we can have multiple function definition for  createAction
//allow function to receive different parameter types.should be same number of parameters
//it can now return different types depending on the parameter type that we receive


export type ActionWithPayload<T,P> = {
    type:T;
    payload:P;
}

export type Action<T> = {
    type:T;
}


    export function createAction<T extends string,P>(type:T, payload:P): ActionWithPayload<T,P>;

    export function createAction<T extends string>(type:T, payload: void): Action<T>;

    export function createAction<T extends string, P>(type: T, payload:P){
        return {type,payload};
    }











// export const createAction = (type,payload) => ({type,payload})
//Give me a type and a payload, and I’ll return a proper Redux action object.
// this helper guarantees that every action you create follows the same format.
//It does not validate the type or payload.
//It just packs them into an object.