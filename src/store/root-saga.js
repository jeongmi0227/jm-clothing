// saga is side effect state management library (just like redux-thunk)
// saga is indeed a middleware
// Typically, with most middleware actions hit middleware before they hit the reducer
// However, with Saga, actions will hit the reducers first before moving onto the saga.
// component -> middleware(except for saga) -> reducer (updates the value) -> Saga (respond the actions and perform certain business logics, certain asynchronous) 
// then maybe the saga does something and it gets a value, and then they might fire a new action
// those will pass through the middleware and then it will continue on the flow
// Note : actions fired by Saga's can trigger other sagas, Saga is fired after the reducers have updated.

import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

//generator function
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}