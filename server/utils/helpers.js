const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

module.exports = {
  setHeaders
};
