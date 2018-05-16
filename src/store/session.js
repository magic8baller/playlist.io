import store from './';

const clearSession = () => {
  const fiftyFiveMinutes = 1000 * 60 * 55;
  window.setTimeout(clear, fiftyFiveMinutes); // === 2 seconds
};

const clear = () => {
  store.dispatch({ type: 'SIGN_OUT_USER' });
};

clearSession();
