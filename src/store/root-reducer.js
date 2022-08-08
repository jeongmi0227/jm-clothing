// combineReducers is a method that allows us to create a final big reducer that we can use inside of our store
import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { orderReducer } from "./order/order.reducer";
// key = name of the reducer slice, value= actual reducer function itself.
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    order:orderReducer,
});
