import store from './';

const clearSession = () => {
  const fiftyFiveMinutes = 1000 * 10;
  window.setTimeout(clear, fiftyFiveMinutes);
};

const clear = () => {
  store.dispatch({ type: 'SIGN_OUT_USER' });
};

clearSession();
