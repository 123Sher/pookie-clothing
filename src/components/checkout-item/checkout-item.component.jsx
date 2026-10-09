import './checkout-item.styles.scss';
//import { useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { removeItemFromCart } from '../../store/cart/cart.action';
import { clearItemFromCart } from '../../store/cart/cart.action';

//import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) =>
{
    const {name,imageUrl,price,quantity} = cartItem;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();
    //const {clearItemFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext);

    const addItemHandler = () =>{
        dispatch(addItemToCart(cartItems,cartItem));
    }
    const removeItemHandler = () => {
        dispatch(removeItemFromCart(cartItems,cartItem));
    }
    const clearItemHandler = () =>
    {
        dispatch(clearItemFromCart(cartItems,cartItem));
    }
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;