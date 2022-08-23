import { createSelector } from "reselect";

const selectOrderReducer = state => state.order;

export const selectOrderHistory = createSelector(
    [selectOrderReducer],
    (order) => order.orderItems
);

export const selectOrderDate = createSelector(
    [selectOrderReducer],
    (order)=>order.orderDate
);