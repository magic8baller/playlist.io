import axios from 'axios';
import { createAction } from 'redux-actions';
import { curry, pipeP } from 'ramda';

import api from '../api';
import { isSuccess } from '../utils/helpers';

export const signInUser = createAction('SIGN_IN_USER');

export const signOutUser = createAction('SIGN_OUT_USER');

const refreshAccessTokenSuccess = ({ access_token }) => ({
  type: 'REFRESH_ACCESS_TOKEN',
  accessToken: access_token
});

const handleRefreshAccessTokenApiResponse = curry(
  (dispatch, response) =>
    isSuccess(response) ? dispatch(refreshAccessTokenSuccess) : console.log(response.statusText)
);

const refreshAccessTokenApiCall = (refreshToken) => api.refreshAccessTokenSent(refreshToken);

export const refreshAccessToken = (refreshToken) => (dispatch) =>
  pipeP(refreshAccessTokenApiCall, handleRefreshAccessTokenApiResponse(dispatch))(refreshToken);
