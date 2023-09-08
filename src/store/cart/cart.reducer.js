import { CART_ACTION_TYPES } from "./cart.types";


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    
    switch (type) {
        case CART_ACTION_TYPES.SetItems:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SetIsCartOpen:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            return state;
    }
}
