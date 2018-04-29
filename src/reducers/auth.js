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
