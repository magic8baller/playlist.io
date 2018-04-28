import { handleActions } from 'redux-actions';

const initialState = {
  isAuthenticated: false
};

export default handleActions(
  {
    AUTH_USER: (state, action) => {
      const { token, userId, firstName } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        token,
        userId,
        firstName
      };
    }
  },
  initialState
);

export const getAuthStatusFrom = (state) => state.auth.isAuthenticated;

export const getFirstNameFrom = (state) => state.auth.firstName;
