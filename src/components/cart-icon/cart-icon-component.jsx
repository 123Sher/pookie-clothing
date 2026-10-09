//import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { CartContext } from '../../contexts/cart.context';
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'; 
//This line imports an SVG file and turns it into a React component that you can render directly in JSX
//import bag from '../../assets/shopping-bag.svg'; => bag is just a file path (string)
//sometimes, you want to style or manipulate the SVG directly in React, For that, you need the SVG as a component, not just an image.
// {ReactComponent as ..} a special import syntax that tells your build setup 
// (like Create React App) to convert that SVG into a React component automatically.
//under the hood the webpack loader converts SVG into react components.
import './cart-icon.styles.scss';

const CartIcon = () => {
    const dispatch = useDispatch();
    //const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;