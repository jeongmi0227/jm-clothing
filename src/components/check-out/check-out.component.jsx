import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckOutItem from '../check-out-item/check-out-item.component';

import './check-out.styles.scss';
const CheckOut = () => {
    const { cartItems,cartTotalPrice } = useContext(CartContext);
    return (
        <div>
            {cartItems.map((cartItem) => <CheckOutItem key={ cartItem.id} cartItem={cartItem}/>)}
            <h1>total ${cartTotalPrice} </h1>
        </div>
    );
};
export default CheckOut;