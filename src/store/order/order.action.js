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

export const addOrderHistory = (orderItems) => {
    return createAction(ORDER_ACTION_TYPES.SET_ORDER_HISTORY, orderItems);
}

export const addOrderDate = (createdTime) => {
    const orderDate = convertUnixTime(createdTime);
    return createAction(ORDER_ACTION_TYPES.SET_ORDER_DATE, orderDate);
}