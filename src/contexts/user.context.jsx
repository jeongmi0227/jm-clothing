import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { onAuthStateChangedListener ,createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

// Context is still is context, because the context is what values that we expose.
// The main differentce now is that how we are storing current user (use useReducer instead of useState)
// as the actual value want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser:() => null,
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER:'SET_CURRENT_USER'
}
const userReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    // payload is going to store the value that is important for this reducer to know what to update this state value with.
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser:null
}

// every context that get built for us, 
// there is a dot provider and the provider is the component that will 
// wrap around any other components that need access to the value inside.
export const UserProvider = ({ children }) => {
    // userReducer (someReducer,initalValue) always return 2 arguments
    // first one is the state object
    // second one is dispatch function (whenver we call dispatch function, we pass it an action object)
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    // const { currentUser } = state;
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        // whenver unmount it will unsubscribe the listener otherwise it will rasie memeory leak issue
        const unsubscribe = onAuthStateChangedListener((user) => { 
            if (user) {
              createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);
    // provider is essentially allowing any of its child components to access the values inside of its useState
    // call setter and get the value anywhere inside of the component tree that is nested within actual provider value.
    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}

// Reducer is just function that always return back an new object (state in the reducer - The object reflects whatever the actual current value is going to be).
// The reason why we always return a new object is because that is how React determines that something has changed.
// As a result if reducer change, then the object must be different.
// The reducers is that change the object that we get back and the properties and value inside them based on the action.

/*
    const userReducer = (state,action) = >{
         return {
         currentUser:
         }
    }
 */