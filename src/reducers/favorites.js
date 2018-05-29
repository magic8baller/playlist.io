import { handleActions } from 'redux-actions';

const initialState = { all: [] };

export default handleActions(
  {
    UPDATE_FAVORITES: (state, action) => ({
      ...state,
      all: action.favorites
    })
  },
  initialState
);

export const getFavorites = (state) => state.favorites.all;
