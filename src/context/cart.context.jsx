import { createContext, useEffect, useReducer, useState } from "react";


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
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},
        removeItemFromCart: () => {},
        clearItemFromCart: () => {},
        cartTotal: 0,
        cartCount: 0
    }
);

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const CART_ACTION_TYPE = {
    SetItems: 'SET_CART_ITEMS',
    SetIsCartOpen: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPE.SetItems:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPE.SetIsCartOpen:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}


export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{
        cartItems, 
        isCartOpen, 
        cartCount, 
        cartTotal
    }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 );
    //     setCartCount(newCartCount);
    // },
    // [cartItems]
    // );
    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 );
    //     setCartTotal(newCartTotal);
    // },
    // [cartItems]
    // );


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 );
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 );

        dispatch({
            type: CART_ACTION_TYPE.SetItems,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            }
        });

    }

    const addItemToCart = (productToAdd) => {
        const result = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(result);
    };

    const removeItemFromCart = (productToRemove) => {
        const result = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(result);
    };

    const clearItemFromCart = (productToRemove) => {
        updateCartItemsReducer(clearCartItem(cartItems, productToRemove));
    }

    const setIsCartOpen = (bool) => {
        dispatch({
            type: CART_ACTION_TYPE.SetIsCartOpen,
            payload: bool
        });
    }




    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartItems, 
        cartTotal,
        cartCount
    };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>;

};



