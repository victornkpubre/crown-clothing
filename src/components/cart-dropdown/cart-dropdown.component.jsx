import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropDownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.style';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <CartDropDownContainer>
            <CartItemsContainer> 
                {
                    cartItems.length? cartItems.map( (item) => (
                        <CartItem key={item.id} cartItem={item}/>
                    )):
                    (<EmptyMessage>Your Cart is Empty</EmptyMessage>)
                }
            </CartItemsContainer>
            <Button onClick={goToCheckout} > GO TO CHECKOUT </Button>
        </CartDropDownContainer>
    );
}

export default CartDropDown;