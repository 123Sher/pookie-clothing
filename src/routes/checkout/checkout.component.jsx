//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import  CheckoutItem  from '../../components/checkout-item/checkout-item.component'; 
import './checkout.styles.scss';

const Checkout = () => {

    //const { cartItems,cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    //useContext(CartContext) returns an object
    // the object is const value = {isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount,}
    console.log(cartItems);
  return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
             
                {cartItems.map(
                    (cartItem) => 
                        ( 
                            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                        )
                    )
                }
             
            
            <span className='total'>Total:{cartTotal}</span>
        </div>
  );
};

export default Checkout;