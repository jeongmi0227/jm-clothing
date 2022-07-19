// The format of a middleware always follows the same signature.
// Three functions that return from one another.
// currying a function is a function that returns back another function.
// it's just a function generator and it allows us to create reusable function.
export const loggerMiddleware = (store) => (next) => (action) => {
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