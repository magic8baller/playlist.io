import axios from 'axios';
import { createAction } from 'redux-actions';

const signUpUserEndpoint = 'http://localhost:8080/api/signup';
const signInUserEndpoint = 'http://localhost:8080/api/signin';

export const signUpUser = ({ firstName, username, password }, callback) => {
  return (dispatch) => {
    axios
      .post(signUpUserEndpoint, { firstName, username, password })
      .then(({ data }) => {
        dispatch({ type: 'AUTH_USER', payload: data });
        callback(data.username);
      })
      .catch(({ response }) => {
        dispatch({ type: 'AUTH_ERROR', payload: response.data.error });
      });
  };
};

export const signInUser = ({ username, password }, callback) => {
  return (dispatch) => {
    axios
      .post(signInUserEndpoint, { username, password })
      .then(({ data }) => {
        dispatch({ type: 'AUTH_USER', payload: data });
        callback(data.username);
      })
      .catch((err) => {
        const errorMsg = 'Username and/or password is invalid';
        dispatch({ type: 'AUTH_ERROR', payload: errorMsg });
      });
  };
};
