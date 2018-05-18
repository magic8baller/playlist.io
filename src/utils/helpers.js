export const isProdEnv = () => !window.location.href.includes('localhost');

export const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

export const isSuccess = (response) => response.status === 200;
