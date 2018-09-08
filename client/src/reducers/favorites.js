import { handleActions } from 'redux-actions';

const initialState = { all: [] };

export default handleActions(
  {
    UPDATE_FAVORITES: (state, { favorites }) => ({
      ...state,
      all: favorites
    }),
    SAVE_DEMO_FAVORITES: (state, { favorites }) => ({
      ...state,
      all: favorites
    })
  },
  initialState
);

export const getFavorites = (state) => state.favorites.all;
