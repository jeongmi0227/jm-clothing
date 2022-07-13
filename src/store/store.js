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

// The format of a middleware always follows the same signature.
// Three functions that return from one another.
// currying a function is a function that returns back another function.
// it's just a function generator and it allows us to create reusable function.
const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action); // the moment this next call happends, actions gets passed on, subsequent middleware will all run
    // reducer will all run, and then only when that is complete will any code after this next fire.

    console.log('next state: ', store.getState());  // new state 
}

// Middleware is like little library helpers that run before an action hits the reducer
// So whenever we dispatch an action before that action hits the reducers, it hits the middleware first.
const middleWares = [loggerMiddleware];
// compose is a functional programming concept.
// It's essentially a way for us to pass multiple functions left to right.
// composition pattern is concered for redux
const composedEnhancers = compose(applyMiddleware(...middleWares));
// root-reducer
// This store is just in order to facilitate the movement and passing of actions through these reducers.
// second argument is additional default states (optional)
// third argument is middleware.
export const store = createStore(rootReducer,undefined,composedEnhancers);
