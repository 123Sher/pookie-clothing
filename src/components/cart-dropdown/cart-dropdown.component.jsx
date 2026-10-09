//import { useContext } from 'react';

//import { Link } from "react-router-dom";
//OR
import { useNavigate } from 'react-router-dom';
//useNavigate is a hook that allows us to get navigate function

//import { CartContext } from '../../contexts/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';
import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { useSelector } from 'react-redux';

const CartDropdown =  () => {
   // const cartItems = useContext(CartContext); 
   // //useContext(CartContext) does NOT return only cartItems.it returns object.
    //the above line thows an error that cartItems.map is not a function.
    //since the context value is an object, to access cartItems, you must destructure it
   // const { cartItems } = useContext(CartContext);
   const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckout = () =>
    {
        navigate("/checkout");
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item =><CartItem key={item.id} cartItem={item} />)}
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                {/*<Link to='/checkout'>
                     <Button>GO TO CHECKOUT</Button>
                </Link>*/}
                {/* OR */}
                <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
            </div>
        </div>
        
    )
}

export default CartDropdown;