import { handleActions } from 'redux-actions';

const initialState = {
  query: null
};

export default handleActions(
  {
    SET_CURRENT_QUERY: (state, action) => ({
      ...state,
      query: action.payload
    })
  },
  initialState
);

export const getCurrentQuery = (state) => state.search.query;
