import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import  { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter as Router } from 'react-router-dom'

import FirebaseProvider from './utilities/firebase/context/firebase.context'; 

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <Router>
        <React.StrictMode>
          <FirebaseProvider>
            <App />
          </FirebaseProvider>
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
