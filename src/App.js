import { useEffect } from "react";
import { useDispatch } from "react-redux";  // dispatch hook that allows us to interact with the Redux store
import { Routes, Route } from 'react-router-dom';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser
} from "./utils/firebase/firebase.utils";
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import CheckOut from './components/checkout/checkout.component';
import OrderHistory from "./components/order-history/order-history.component";
import { checkUserSession } from "./store/user/user.action";

// import { getCategoriesAndDocuments } from "./utils/firebase/firebase.utils";
// import { setCategoriesMap } from "./store/categories/category.action";
// Routes allows this application to register these root level components
// that will then in turn render a specific component when it matches this specific route that we are looking for.
const App = () => {
  // this dispatch will never change or update, always going to be same reference.
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(checkUserSession());
    // // whenver unmount it will unsubscribe the listener otherwise it will rasie memeory leak issue
    // const unsubscribe = onAuthStateChangedListener((user) => { 
    //     if (user) {
    //       createUserDocumentFromAuth(user);
    //     }
    //   // dispatch actions to the root reducer, which in turn passes the action to every single reducer function.
    //     dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;
  }, []);
//}, [dispatch]); React does not know that this dependency that it's getting from a hook, this dispatch does not change
  return (
    // index attribute tell this route is that when you match just this slash,
    // then this should be the home component
    <Routes>
      <Route path='/' element={<Navigation />} >
      
        <Route index={true} element={<Home />} /> 
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />  
        <Route path='checkout' element={<CheckOut />} />
        <Route path='/order' element={<OrderHistory />}/>
      </Route>

    </Routes>  
    );
}
// web application, depending on the route and the sub route you navigate to,
// will either decide to keep or remove and change different components on the page.

export default App;

// Understand React rendering 
// Execution of the render function, which does not always imply an update of the UI.