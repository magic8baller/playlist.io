import { handleActions } from 'redux-actions';
import { find, propEq } from 'ramda';

const initialState = { all: [] };

export default handleActions(
  {
    ADD_FAVORITE_TRACK: (state, action) => ({
      ...state,
      all: [...state.all, action.trackData]
    })
  },
  initialState
);

export const getFavorites = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;
