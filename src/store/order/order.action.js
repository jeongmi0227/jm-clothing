import { ORDER_ACTION_TYPES } from "./order.types";
import { createAction } from "../../utils/reducer/reducer.util";

const convertUnixTime = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year+'/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
const addItemToHistory = (orderItems,createdTime,userId) => {
    const orderDate = convertUnixTime(createdTime);
    return [...orderItems, { orderDate: orderDate, userId: userId }]
}
export const addOrderHistory = (orderItems, createdTime, userId) => {
    const newOrderHistory = addItemToHistory(orderItems, createdTime, userId);
    return createAction(ORDER_ACTION_TYPES.SET_ORDER_HISTORY, newOrderHistory);
}
