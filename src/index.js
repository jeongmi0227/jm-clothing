import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter is the generic router, it leverages the URL in order to keep track of the history of where the user is navigating through
// It behaves, as typically would expect, any kind of routing based on URL to behave.
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import reportWebVitals from './reportWebVitals';
import './index.scss';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
