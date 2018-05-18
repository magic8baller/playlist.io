import axios from 'axios';
import { createAction } from 'redux-actions';

import { REFRESH_ACCESS_TOKEN_ENDPOINT } from '../utils/endpoints';

export const signInUser = createAction('SIGN_IN_USER');
export const signOutUser = createAction('SIGN_OUT_USER');

export const initRefreshAccessToken = (refreshToken) => (dispatch) => {
  const config = {
    refresh_token: refreshToken
  };

  axios
    .post(REFRESH_ACCESS_TOKEN_ENDPOINT, config)
    .then((res) => {
      dispatch({ type: 'REFRESH_ACCESS_TOKEN', payload: res.data.access_token });
    })
    .catch((err) => {
      console.error(err);
    });
};
