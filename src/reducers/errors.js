import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    AUTH_ERROR: (state, action) => ({
      ...state,
      authError: action.payload
    })
  },
  initialState
);

export const getAuthErrorFrom = (state) => state.errors.authError;
