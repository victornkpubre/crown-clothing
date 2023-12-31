import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.style';


const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount); 
    
    const toogleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    };

    console.log(cartCount);

    return (
        <CartIconContainer onClick={toogleIsCartOpen} >
            <ItemCount>{ cartCount }</ItemCount>
            <ShoppingIcon/>
            
        </CartIconContainer>
    );
}

export default CartIcon;