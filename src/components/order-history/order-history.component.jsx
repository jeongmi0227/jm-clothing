import { useSelector } from "react-redux";
import { selectOrderHistory,selectOrderDate } from "../../store/order/order.selector";
import { OrderHistoryContainer } from "./order-history.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import OrderHistoryList from "../order-history-list/order-history-list.component";

const OrderHistory = () => {
    const orderHistory = useSelector(selectOrderHistory);
    const currentUser = useSelector(selectCurrentUser);
    const orderDate = useSelector(selectOrderDate);
    // console.log(orderHistory);
    // console.log(currentUser.displayName);
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
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>BuyAgain</span>
                </div>
            </div>
            {orderHistory.map((order) => <OrderHistoryList key={order.id} order={order} userName={currentUser.displayName} orderDate={orderDate} />)}
        </OrderHistoryContainer>
    )
};

export default OrderHistory;