import { handleActions } from 'redux-actions';

const initialState = { path: '/' };

export default handleActions(
  {
    SET_PATH: (state, { path }) => ({
      ...state,
      path
    })
  },
  initialState
);

export const getPath = (state) => state.nav.path;
