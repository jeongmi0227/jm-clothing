import { useEffect } from "react";
import { createContext, useState } from "react";
import { onAuthStateChangedListener ,createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

// as the actual value want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser:() => null,
});

// every context that get built for us, 
// there is a dot provider and the provider is the component that will 
// wrap around any other components that need access to the value inside.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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