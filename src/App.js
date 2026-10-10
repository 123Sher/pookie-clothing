import { useEffect } from "react"; 
import { lazy,Suspense } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener , createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import { setCurrentUser  } from "./store/user/user.action";
import { Routes,Route } from 'react-router-dom'; //these two components are used to assemble routing at application level.
//import route components in App.js so React Router knows which component to show for each path.
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));




//the app component does not actually need this category's map data.
// The first component that actually needs this category is MAP is actually.
// Our shop page.
//therefore no need to add the API that fetches code externally here.

const App = () =>{
  const dispatch = useDispatch();//Give me the dispatch function from the Redux store.”
  //always returns the same dispatch function reference for the same store.
  //therefore, Inside your useEffect:
  //dispatch is:not recreated,not replaced,not updated
  
  //this effect is only running on initialization in order to set up onAuthStateChangedListener 
   useEffect(() => {
              //centralized our sign out and sign in into this listener callback.
              //if user signs out, we get null
              //if user signs in, we get user obj
          const unsubscribe = onAuthStateChangedListener((user) => {
              if(user)
              {
                  createUserDocumentFromAuth(user);
              }
              const safeUser = user
            ? {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
              }
            : null;
              dispatch(setCurrentUser(safeUser)); 
              console.log("dispatching user", safeUser);
              //now setCurrentUser just creating an object for us, which is our action object.
              //dispatch is actions to the root reducer, which in turn passes the 
              // action to every single reducer function.

              //NOTE: Actions must be plain objects.
              //but here we're passing a async function to return a object,
              // Redux allows this because of thunk middleware.
              //if the store does not have thunk enabled, then we'll get a error.
          });
            return unsubscribe
        },[dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes> {/*  component is used to define your route configuration — 
      essentially telling your app which components to render based on the URL.*/}
        <Route path='/' element={<Navigation />}> {/*<Navigation /> is the layout, all other pages are the children,
        they must render inside <Navigation /> via Outlet */}
          <Route index element={<Home />} />  
          {/*React Router doesn't need a path on the index route, 
          because it’s automatically matched when the parent route is matched exactly and 
          no other child route is specified. */}
          <Route path='shop/*' element={<Shop />} />
          {/* Without /*, React Router won’t match child routes
          * means: “match everything after /shop
          /shop/hats won’t render anything
          shop/* => Render <Shop /> for /shop AND anything that starts with /shop/...*/}
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route> {/* defines a single route — mapping a URL path to a React component.*/}
      </Routes>
    </Suspense>
    
  ) 
  //these components are able to connect to the URL and therefore render the appropriate alignments is because of 
  // the fact that these are nested inside of the browser router in index.js.
  //<Outlet /> is like a window or placeholder inside a parent component that tells React Router:
  // “Render the matched child route right here.”


  //index route
  // Matches exactly the parent path
  // No extra URL segment

}


export default App;
