import { OrderContainer } from "./order-confirm-details.styles";

const OrderConfirmDetails = () => {
    return (
        <OrderContainer>
            <h1>Order Details</h1>
            <div className='confirm-header'>
                <div className='header-block'>
                <span>Product</span>
                </div>
                <div className='header-block'>
                <span>Description</span>
                </div>
                <div className='header-block'>
                <span>Quantity</span>
                </div>
                <div className='header-block'>
                <span>Price</span>
                </div>
            </div>
            {/* {cartItems.map((cartItem) => <CheckOutItem key={ cartItem.id} cartItem={cartItem}/>)} */}
            {/* <span className='total'>Total: ${cartTotalPrice} </span> */}
        </OrderContainer>
    )
};

export default OrderConfirmDetails;
