import { handleActions } from 'redux-actions';
import { filter, curry } from 'ramda';

const initialState = { all: [] };

const deleteFavorite = curry((targetTrackId, track) => targetTrackId === track.id);

export default handleActions(
  {
    UPDATE_FAVORITES: (state, action) => ({
      ...state,
      all: action.favorites
    })
  },
  initialState
);

export const getFavorites = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;
