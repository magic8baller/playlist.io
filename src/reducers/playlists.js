import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    ADD_PLAYLIST: (state, action) => ({
      ...state,
      current: [...action.payload]
    })
  },
  initialState
);
