import { Outlet, Link } from "react-router-dom" //Used for internal navigation in Single Page Applications (SPA).
//LINK=>Doesn’t reload the page — fast navigation.
import { useSelector } from "react-redux";
//import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { Fragment, useContext} from "react"; //a Fragment is used to group multiple elements without adding an extra node to the DOM.
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'; //import the SVG file as a React component
import { signOutUser } from "../../utils/firebase/firebase.utils";
//import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import './navigation.styles.scss'

const Navigation = () =>
{
  console.log("Navigation rendered!");
  
  //selector function is something that essentially extracts off the values that you want 
  // from the whole entire Redux store.

  //When the reducer returns a new state, useSelector runs again.
  // If the value returned by the selector (currentUser) is different from the previous one, 
  // then React will re-render the component.
  const currentUser = useSelector(state => state.user.currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
    //const { currentUser } = useContext(UserContext);
  //const { isCartOpen } = useContext(CartContext);

  /*const signOutHandler = async () => {
    const res = await signOutUser();
    //signOutUser is a function that's just returning us back.Whatever sign out gives us back.And because this method
    //  is most likely asynchronous, we get it as a promise.
    setCurrentUser(null);
  }*/
 
  return (
   <Fragment>
      <div className="navigation">
        <Link className='logo-container' to='/'>
          <CrwnLogo className="logo"></CrwnLogo>
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {
            //If the current user does not exist, then what we'll do is we will render our sign in link.
            /*currentUser ? (<span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>) : 
            (<Link className="nav-link" to='/auth'>SIGN-IN</Link>)*/
            currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) : 
            (<Link className="nav-link" to='/auth'>SIGN-IN</Link>) // the moment a user signs out are off, state 
            // change listener is going to catch it.So all we really need is just to call sign out user 
            // whenever this link is clicked so we can actually get rid of this sign out handler as well as this setter function.
            // cleanest way to navigate from /auth to /shop in React is by using the useNavigate hook from react-router-dom right inside your Sign-In component.
          }
          <CartIcon />
        </div>
       
      </div>
       {isCartOpen && <CartDropdown />}
       <Outlet />
       {/* <Outlet /> is only meant to be used inside a parent route component — a component that has child routes defined in App.js.*/}
    </Fragment>
  )
}

export default Navigation;