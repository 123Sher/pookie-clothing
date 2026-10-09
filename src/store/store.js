//here, we generate the store object that we will use inside application
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; // two methods to set up the persistence
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

//store object:
//1) holds your whole app state
//2) runs your reducers
//3) lets you dispatch actions
//4) you need a root reducer to create a store  

// this is configuration object that tells what,where and how to redux-persist


// A error: A non-serializable value was detected in an action
//
const persistConfig = {
  key:'root',
  storage,
  blacklist : ['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);



//middlewares: little library that runs before the action hits the reducer
//therefore, when dispatching an action, before that hitting reducer, it hits the middlewares first


//export const store = configureStore(rootReducer,undefined,composedEnhancers);//this will be error 
// when not passing an object to configureStore
export const store = configureStore({
  //reducer: rootReducer,
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },}).concat(logger),
})

export const persistor = persistStore(store);
//when app starts, persistStore(store) runs and internally dispatches the below action.
// store.dispatch({
//   type: 'persist/PERSIST',
//   register: function register(key) { ... },   // 👈 function reference
//   rehydrate: function rehydrate(key, payload, err) { ... }, // 👈 function reference
// })

// register & rehydrate => callback functions as communication mechanism btw persistor and store.
//When a reducer sees persist/PERSIST, it calls action.register(key) to tell the persistor 
// "hey, I'm here and ready". It's an internal handshake.

//without those two callbacks the whole persist/rehydrate cycle would be completely broken. 
// They are the only communication channel between the persistor (outside the store) and 
// the persistReducer (inside the store). 

//That's exactly why redux-persist attaches them directly onto the action — 
// it's the only way to pass them through Redux's dispatch system.



//Returns a persistor object that manages the persistence process.
//Manages the process of saving the entire store's state to persistent storage and rehydrating it on app load.
//starts the redux-persist engine for that store.

//It:

//reads the saved data from storage (localStorage)
// dispatches a special action called REHYDRATE
// keeps a controller object (called persistor) to manage persistence

//persistor is NOT the Redux store.It is a small controller object used by redux-persist.




//getDefaultMiddleware=>This is a function that Redux Toolkit gives you.
//you get an array like:[ thunk, serializableCheck, immutableCheck ]
//.concat(logger) => take the default middleware array and add redux-logger at the end which becomes
//[ thunk, serializableCheck, immutableCheck, logger ]
//if only logger is there, then async action stops working 
//RTK's 3 default middlewares:
//Thunk middleware → allows async actions
//Immutable state check (Warns if you accidentally mutate state (dev only))
//Serializable state check (Warns if non-serializable values (functions, class instances, etc.) are in actions or state)


//So async logic works because of Redux Thunk, which is already included.

// this store object will be the one we'll be providing to redux Provider in index.js


//Term	What it really is
//middleware=>	logic that runs between dispatch → reducer
//applyMiddleware=>	function that turns middleware into an enhancer
//enhancer=>	function that enhances createStore
//compose=>	helper to combine enhancers



//REDUX PERSIST INTERNAL FLOW
//1) Store is created
  //configureStore({
    //reducer: persistedReducer
  //})
//2)persistStore(store)
//3) redux-persist does
    //=> read local storage
    //=> get saved state
    //=> dispatch rehydrate action
//4) your persistedReducer receives the action and merges the saved data
//5) persistGate waits and then renders <App />


//👉 You already saved some Redux state in localStorage
//👉 When the app reloads, redux-persist loads it back

//That loading back process is called:
//rehydration