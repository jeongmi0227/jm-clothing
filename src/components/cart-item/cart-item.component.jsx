import { CartItemContainer, ItemDetails } from './cart-item.styles';


const CartItem = ({ cartItem }) => {
    const { name,imageUrl,price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <h2 className='name'>{name}</h2>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
};
export default CartItem;