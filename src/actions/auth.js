import { createAction } from 'redux-actions';

import api from '../api';
import { isSuccess } from '../utils/helpers';

export const signInUser = createAction('SIGN_IN_USER');

export const signOutUser = createAction('SIGN_OUT_USER');

const refreshAccessTokenSuccess = ({ access_token }) => ({
  type: 'REFRESH_ACCESS_TOKEN',
  accessToken: access_token
});

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  const response = await api.refreshAccessTokenSent(refreshToken);

  isSuccess(response)
    ? dispatch(refreshAccessTokenSuccess(response.data))
    : console.log(response.statusText);
};
