import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckOutItem = ({ cartItem }) => {
    const { name, id, imageUrl, quantity, price } = cartItem;
    const { removeItemToCart,addItemToCart, } = useContext(CartContext);
    const removeProductToCart = () => removeItemToCart(cartItem, false);
    const deleteProductToCart = () => removeItemToCart(cartItem,true);
    const addProductToCart = () => addItemToCart(cartItem);

    return (
        <div>
            <img src={imageUrl} alt={`${name}`}/>
            <h1>{name}</h1>
            <button onClick={removeProductToCart}>{`<`}</button>
            <span>{quantity}</span>
            <button onClick={addProductToCart}>{`>`}</button>
            <span>${price}</span>
            <button onClick={deleteProductToCart}> X</button>
        </div>
    );
}

export default CheckOutItem;