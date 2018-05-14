import { handleActions } from 'redux-actions';

const initialState = {
  isAuthenticated: false
};

export default handleActions(
  {
    SIGN_IN_USER: (state, action) => ({
      ...state,
      ...action.payload,
      isAuthenticated: true
    })
  },
  initialState
);

export const getAuth = (state) => state.auth;

export const getSpotifyId = (state) => state.auth.spotifyId;

export const getAccessToken = (state) => state.auth.accessToken;

export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
