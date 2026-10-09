import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store,persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

//We import all context files in index.js (or sometimes in App.js) so that the entire React app can access those contexts globally.
//import { UserProvider } from './contexts/user.context';
//import { CategoriesProvider } from './contexts/categories.context';
//import { CartProvider } from './contexts/cart.context';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
      <BrowserRouter> {/*BrowserRouter is the standard router component that uses the HTML5 history API to 
      keep your UI in sync with the URL.*/}

      {/*So now any component inside of this user provider nested deep within the app can access the context
      value inside of the provider itself.every component inside <App /> can access UserContext to know if a user is logged in.*/}
      {/*If providers are independent → order doesn’t matter to wrap.
      If one provider uses context from another → the dependency provider goes outside. */}
      {/*<UserProvider>*/}
        {/*<CategoriesProvider>*/}
          {/*<CartProvider>*/}
            <App /> 
          {/*</CartProvider>*/}
        {/*</CategoriesProvider>*/}
      {/*</UserProvider>*/}
      </BrowserRouter>
    </Provider>
    </PersistGate>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
