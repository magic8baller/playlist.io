import { createAction } from 'redux-actions';

import api from '../api';
import { isSuccess } from '../utils/helpers';
import { refreshAccessTokenSuccess, signInUserSuccess, addUserId } from '../utils/dispatchHelpers';

export const registerDemoUser = createAction('REGISTER_DEMO_USER');

export const signInUser = (userData) => (dispatch) => {
  dispatch(signInUserSuccess(userData));
  dispatch(addUserId(userData.userId));
};

export const signOutUser = createAction('SIGN_OUT_USER');

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  const response = await api.refreshAccessTokenSent(refreshToken);

  isSuccess(response)
    ? dispatch(refreshAccessTokenSuccess(response.data))
    : console.log(response.statusText);
};
