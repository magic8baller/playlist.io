import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { Provider } from 'react-redux';

import App from './components/App/App';
import store from './store';

const myEnv = dotenv.config();
dotenvExpand(myEnv);

window.store = store;

const clearSession = () => {
  const fiftyFiveMinutes = 1000 * 60 * 55;
  window.setTimeout(clear, fiftyFiveMinutes); // === 2 seconds
};

const clear = () => {
  store.dispatch({ type: 'SIGN_OUT_USER' });
};

clearSession();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
