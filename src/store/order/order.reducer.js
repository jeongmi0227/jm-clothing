import { ORDER_ACTION_TYPES } from "./order.types";

export const ORDER_HISTORY_INITIAL_STATE = {
    orderItems: [],
    orderDate:'',
}

export const orderReducer = (state = ORDER_HISTORY_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_ACTION_TYPES.SET_ORDER_HISTORY:
            return {
                ...state,
                orderItems: payload
            };
        case ORDER_ACTION_TYPES.SET_ORDER_DATE:
            return {
                ...state,
                orderDate: payload
            };
            default:
            return state;
        
    }

}

