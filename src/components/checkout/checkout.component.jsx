import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckOutItem from '../checkout-item/checkout-item.component';
import './checkout.styles.scss';

const CheckOut = () => {
    const { cartItems,cartTotalPrice } = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='checkout-block'>
                    <span>Product</span>
                </div>
                <div className='checkout-block'>
                <span>Description</span>
                </div>
                <div className='checkout-block'>
                <span>Quantity</span>
                </div>
                <div className='checkout-block'>
                <span>Price</span>
                </div>
                <div className='checkout-block'>
                <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => <CheckOutItem key={ cartItem.id} cartItem={cartItem}/>)}
            <span className='total'>Total: ${cartTotalPrice} </span>
        </div>
    );
};
export default CheckOut;