import { handleActions } from 'redux-actions';

const initialState = {
  isAuthenticated: false
};

export default handleActions(
  {
    AUTH_USER: (state, action) => ({
      ...state,
      ...action.payload,
      isAuthenticated: true
    }),
    UNAUTH_USER: (state, action) => ({
      ...initialState
    })
  },
  initialState
);

export const getAuth = (state) => state.auth;

export const getSpotifyId = (state) => state.auth.spotifyId;
