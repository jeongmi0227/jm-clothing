import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";



export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems,productToAdd) => { 
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const removeItemFromCart = (cartItems,productToRemove) => { 
    const newCartItems = removeCartItem(cartItems, productToRemove);    
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearItemFromCart = (cartItems,productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);    
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearAllFromCart = () => {
    console.log('clearAllFromCart');
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,[]);
}