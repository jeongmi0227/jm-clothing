import { CART_ACTION_TYPES } from "./cart.types";


export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],

}

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    // Note : Reducer should not handle any business logic, meaning that inside of a reducer
    // payload should already be whatever we need to update.
    // reducer should care about is really just updating the state, should not worry about anything regarding how to update that state.
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            return state;
    }
}