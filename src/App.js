import Home from './routes/home.component';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import CheckOut from './components/checkout/checkout.component';

// Routes allows this application to register these root level components
// that will then in turn render a specific component when it matches this specific route that we are looking for.
const App = () => {
  return (
    // index attribute tell this route is that when you match just this slash,
    // then this should be the home component
    <Routes>
      <Route path='/' element={<Navigation />} >
      
        <Route index={true} element={<Home />} /> 
        <Route path='shop' element={<Shop />} />  
        <Route path='auth' element={<Authentication />} />  
        <Route path='checkout' element={<CheckOut/>} />
      </Route>

    </Routes>  
    );
}
// web application, depending on the route and the sub route you navigate to,
// will either decide to keep or remove and change different components on the page.

export default App;
