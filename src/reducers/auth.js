import { handleActions } from 'redux-actions';

const initialState = { isAuthenticated: false };

export default handleActions(
  {
    SIGN_IN_USER: (state, { userData }) => ({
      ...state,
      ...userData,
      isAuthenticated: true,
      isPremium: Boolean(userData.isPremium === 'true')
    }),
    REFRESH_ACCESS_TOKEN: (state, action) => ({
      ...state,
      accessToken: action.accessToken
    })
  },
  initialState
);

export const getAuth = (state) => state.auth;

export const getSpotifyId = (state) => state.auth.spotifyId;

export const getAccessToken = (state) => state.auth.accessToken;

export const getRefreshToken = (state) => state.auth.refreshToken;

export const getIsAuthenticated = (state) => state.auth.isAuthenticated;

export const getIsPremium = (state) => state.auth.isPremium;
