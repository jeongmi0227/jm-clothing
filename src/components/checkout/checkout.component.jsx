import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import CheckOutItem from '../checkout-item/checkout-item.component';
import PaymentForm from '../payment-form/payment-form.component';
import { CheckoutContainer } from './checkout.styles';

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalPrice = useSelector(selectCartTotal);
    return (
        <CheckoutContainer>
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
            <PaymentForm />
        </CheckoutContainer>
    );
};
export default CheckOut;