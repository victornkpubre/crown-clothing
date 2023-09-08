import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    const cartItemExists = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(cartItemExists) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id?
            {...cartItem, quantity: cartItem.quantity +1 }:
            cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];

}

const removeCartItem = (cartItems, productToRemove) => {
    const cartItemExists = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if(cartItemExists.quantity === 1 ) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id?
        {...cartItem, quantity: cartItem.quantity - 1 }:
        cartItem
    );
}

const clearCartItem = (cartItems, productToRemove) => {
    cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SetIsCartOpen, boolean);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCart = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SetItems, newCart);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCart = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SetItems, newCart);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCart = clearCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SetItems, newCart);
}