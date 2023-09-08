import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.style';
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

const Checkout = () => {
    const cartTotal = useSelector(selectCartTotal); 
    const cartItems = useSelector(selectCartItems);

    return (
        <CheckoutContainer> 
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => {
                    // const {id, name, quantity} = cartItem;
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    );

                })
            }
            <Total>Total ${cartTotal}</Total>
        </CheckoutContainer>
    );
}

export default Checkout;