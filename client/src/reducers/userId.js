import { handleActions } from 'redux-actions';

const initialState = { userId: null };

export default handleActions(
  {
    ADD_USER_ID: (state, { userId }) => ({
      ...state,
      userId
    })
  },
  initialState
);

export const getUserId = ({ userId }) => userId.userId;
