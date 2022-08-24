
const OrderHistoryList = ({ order, userName,orderDate }) => {
    const { name, imageUrl, quantity, price } = order;
    console.log(order);
    return (
        <div className='history-header'>
            <div className='header-block'>
                <span>{orderDate}</span>
            </div>
            <div className='header-block'>
                <span>{userName}</span>
            </div>
            <div className='header-block'>
                <span>${price}</span>
            </div>
            <div className='header-block'>
                <img height="100" width="100" src={imageUrl} alt={`${name}`} />
            </div>
        </div>
    )
};

export default OrderHistoryList;
