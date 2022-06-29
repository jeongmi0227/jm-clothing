import { createContext,useState,useEffect } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => { 
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    // Although it works as cartCount, however, create a new useEffect
    // This is the best practice when using effect make sure it governs one singular responsibility
    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price, 0);
        setCartTotalPrice(newCartTotalPrice);
    },[cartItems]);
    // addItemToCart triggers whenever a user clicks on button
    const addItemToCart = (productToAdd) => { 
        setCartItem(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => { 
        setCartItem(removeCartItem(cartItems, productToRemove));    
    }

    const clearItemFromCart = (productToClear) => {
        setCartItem(clearCartItem(cartItems, productToClear));    
    }

    const value = { isCartOpen,setIsCartOpen ,addItemToCart,cartItems,cartCount,removeItemFromCart,cartTotalPrice,clearItemFromCart};
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}