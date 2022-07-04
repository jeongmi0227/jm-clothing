import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd) => {
    // find if cart item contains productToAdd
    // find function will select first element that matches the condition return it 
    const exisitingItem = cartItems.find((item) => item.id == productToAdd.id);
    // if found, then increment quantity
    // map function will transform and creat new array
    if (exisitingItem) {
        return cartItems.map((cartItem) =>
            cartItem.id == productToAdd.id ?
                { ...cartItem,quantity : cartItem.quantity + 1 }
                : cartItem
        )
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    // find match item 
    const checkItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    // if found, then remove item
    if (checkItem.quantity == 1) {
        // remove from the list
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

    }
    // reduce quantity
    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartTotalPrice:0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotalPrice:0
}

const CART_ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    // Note : Reducer should not handle any business logic, meaning that inside of a reducer
    // payload should already be whatever we need to update.
    // reducer should care about is really just updating the state, should not worry about anything regarding how to update that state.
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            }
     
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}
// Reducer allow us to conjugate some of logic into one separate function and primarily that the good time to use reducer is when one update 
// needs to modify multiple readable values inside of state
export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    
    const updateCartItemReducer = (newCartItems) => {
        /**
         * generate newCartTotal
         * generate newCartCount
         * 
         * dispatch new action with payload = {
         *  newCartitems,
         *  newCartTotal,
         *  newCartCount
         * }
         */
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotalPrice = newCartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price, 0);
        dispatch(
            createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotalPrice: newCartTotalPrice,
                cartCount: newCartCount
            })
        );
    }

    // addItemToCart triggers whenever a user clicks on button
    const addItemToCart = (productToAdd) => { 
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => { 
        const newCartItems = removeCartItem(cartItems, productToRemove);    
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);    
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (newCartStatus) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, newCartStatus));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, cartTotalPrice, clearItemFromCart };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}