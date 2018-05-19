const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

const not = (fn) => (...args) => !fn(args);

const isTestEnv = () => process.env.NODE_ENV === 'test';

const isNotTestEnv = not(isTestEnv);

module.exports = {
  setHeaders,
  isTestEnv,
  isNotTestEnv
};
