import Home from './components/routes/home.component';
import { Routes,Route } from 'react-router-dom';
// Routes allows this application to register these root level components
// that will then in turn render a specific component when it matches this specific route that we are looking for.
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home /> } />
    </Routes>  
    );
}
// web application, depending on the route and the sub route you navigate to,
// will either decide to keep or remove and change different components on the page.

export default App;
