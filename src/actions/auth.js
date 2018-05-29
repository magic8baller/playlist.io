import { createAction } from 'redux-actions';

import api from '../api';
import { isSuccess } from '../utils/helpers';
import { refreshAccessTokenSuccess } from '../utils/dispatchHelpers';

export const signInUser = createAction('SIGN_IN_USER');

export const signOutUser = createAction('SIGN_OUT_USER');

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  const response = await api.refreshAccessTokenSent(refreshToken);

  isSuccess(response)
    ? dispatch(refreshAccessTokenSuccess(response.data))
    : console.log(response.statusText);
};
