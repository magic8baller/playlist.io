import { handleActions } from 'redux-actions';
import { filter, curry } from 'ramda';

const initialState = { all: [] };

const deleteFavorite = curry((targetTrackId, track) => targetTrackId === track.id);

export default handleActions(
  {
    ADD_FAVORITE_TRACK: (state, action) => ({
      ...state,
      all: action.favorites
    }),
    DELETE_FAVORITE_TRACK: (state, action) => {
      const updatedFavorites = filter(deleteFavorite(action.targetTrackId), state.all);

      return {
        ...state,
        all: updatedFavorites
      };
    }
  },
  initialState
);

export const getFavorites = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;
