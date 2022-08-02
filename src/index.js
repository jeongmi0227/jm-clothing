import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter is the generic router, it leverages the URL in order to keep track of the history of where the user is navigating through
// It behaves, as typically would expect, any kind of routing based on URL to behave.
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';   // similar to a provider. Any components inside of this elements will now have access to the stripe elements that we will use later 

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';

import './index.scss';

// The serverless functions
// Serverless function is a very efficient way for us in order to perform these back end functionalities, but with very minimal resources
// It is essentially a function that lives on the cloud, and this function performs that single reponsibility, it spins up, it does its reponsibility, and then it's done.

// Prior to use the stripe 
// Register application, so it knows to use Stripe.
// Stripe provides react components known as Stripe elements that we can use, such as the card component
// stripe/stripe-js is the javascript library that allows us to make stripe payments
// stripe/react-stripe-js give us the react elements and react bindings so that we can interact with the Stripe JS library of the react environment


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
      </PersistGate>
      </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
