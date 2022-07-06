// Redux library allows us to interact with the reducers that produce the root reducer 
// which produce the store.

// React redux which gives us all the react bindings so that we can dispatch 
// and pull these store values off of redux

// Redux logger helps us to understand how actions are firing and 
// what’s happening with our state.
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
// reducers allow us to actually form the state object.

// Middleware is like little library helpers that run before an action hits the reducer
// So whenever we dispatch an action before that action hits the reducers, it hits the middleware first.
const middleWares = [logger];
// compose is a functional programming concept.
// It's essentially a way for us to pass multiple functions left to right.
// composition pattern is concered for redux
const composedEnhancers = compose(applyMiddleware(...middleWares));
// root-reducer
// This store is just in order to facilitate the movement and passing of actions through these reducers.
// second argument is additional default states (optional)
// third argument is middleware.
export const store = createStore(rootReducer,undefined,composedEnhancers);
