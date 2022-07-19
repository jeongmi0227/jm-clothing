import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter is the generic router, it leverages the URL in order to keep track of the history of where the user is navigating through
// It behaves, as typically would expect, any kind of routing based on URL to behave.
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store , persistor} from './store/store';
import './index.scss';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </PersistGate>
      </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
