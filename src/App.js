import Home from './components/routes/home.component';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/routes/navigation/navigation.component';

const Shop = () => {
  return <h1>This is Shop!</h1>;
}
// Routes allows this application to register these root level components
// that will then in turn render a specific component when it matches this specific route that we are looking for.
const App = () => {
  return (
    // index attribute tell this route is that when you match just this slash,
    // then this should be the home component
    <Routes>
      <Route path='/' element={<Navigation />} >
      
        <Route index={true} element={<Home />} /> 
        <Route path='shop' element={<Shop />}/>  
      </Route>

    </Routes>  
    );
}
// web application, depending on the route and the sub route you navigate to,
// will either decide to keep or remove and change different components on the page.

export default App;
