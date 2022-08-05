import { OrderHistoryContainer } from "./order-history.styles";

const OrderHistory = () => {
    return (
        <OrderHistoryContainer>
            <h1>Order History</h1>
            <div className='history-header'>
                <div className='header-block'>
                    <span>Order#</span>
                </div>
                <div className='header-block'>
                    <span>Order Placed</span>
                </div>
                <div className='header-block'>
                    <span>Ship to</span>
                </div>
                <div className='header-block'>
                    <span>Total</span>
                </div>
                <div className='header-block'>
                    <span>BuyAgain</span>
                </div>
            </div>
        </OrderHistoryContainer>
    )
};

export default OrderHistory;