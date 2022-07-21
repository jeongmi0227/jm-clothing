// Redux library allows us to interact with the reducers that produce the root reducer 
// which produce the store.

// React redux which gives us all the react bindings so that we can dispatch 
// and pull these store values off of redux

// Redux logger helps us to understand how actions are firing and 
// what’s happening with our state.
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// Redux-thunk is asynchronous side effects inside of Redux
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
// reducers allow us to actually form the state object.



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware is like little library helpers that run before an action hits the reducer
// So whenever we dispatch an action before that action hits the reducers, it hits the middleware first.
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean); // remove anything that's got false ,if it is true return object (middleware will be applied in development)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// compose is a functional programming concept.
// It's essentially a way for us to pass multiple functions left to right.
// composition pattern is concered for redux
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
// root-reducer
// This store is just in order to facilitate the movement and passing of actions through these reducers.
// second argument is additional default states (optional)
// third argument is middleware.
export const store = createStore(persistedReducer,undefined,composedEnhancers);


export const persistor = persistStore(store);