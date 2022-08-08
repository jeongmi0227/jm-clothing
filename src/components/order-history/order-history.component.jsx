import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../store/order/order.selector";
import { OrderHistoryContainer } from "./order-history.styles";

const OrderHistory = () => {
    const orderHistory = useSelector(selectOrderHistory);
    console.log('sss');
    console.log(orderHistory);
    return (
        <OrderHistoryContainer>
            <h1>Order History</h1>
            <div className='history-header'>
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
            <div>
            
            </div>
        </OrderHistoryContainer>
    )
};

export default OrderHistory;