import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    SEARCH_ERROR: (state, action) => ({
      ...state,
      searchErrMsg: action.payload
    })
  },
  initialState
);
