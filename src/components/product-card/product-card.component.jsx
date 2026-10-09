//import {useContext} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

//import {CartContext} from '../../contexts/cart.context';

import './product-card.styles.scss';
import Button from '../button/button.component';

const ProductCard = ({ product }) => { //coming from shop.component.jsx
    const { name , price , imageUrl } = product;
    //const {addItemToCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () =>  dispatch(addItemToCart(cartItems,product));


    return(
        <div className='product-card-container'>
            <img src={ imageUrl } alt={`${name}`} /> {/*`` is used to convert name to a string.*/}
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;