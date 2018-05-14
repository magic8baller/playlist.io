import { handleActions } from 'redux-actions';
import { find, propEq } from 'ramda';

const initialState = { saved: [], current: [] };

export default handleActions(
  {
    ADD_PLAYLIST: (state, action) => ({
      ...state,
      current: [...action.payload]
    }),
    SAVE_PLAYLIST: (state, action) => ({
      ...state,
      saved: [...state.saved, action.payload]
    }),
    SET_CURRENT_PLAYLIST: (state, action) => {
      const { playlistId } = action;
      const newCurrentPlaylist = find(propEq('playlistId', playlistId), state.saved);

      return {
        ...state,
        current: newCurrentPlaylist.tracks
      };
    },
    DELETE_CURRENT_PLAYLIST: (state) => ({
      ...state,
      current: null
    }),
    RESOLVE_CURRENT_PLAYLIST: (state) => ({
      ...state,
      current: []
    }),
    FETCH_SAVED_PLAYLISTS: (state, action) => ({
      ...state,
      saved: action.payload
    })
  },
  initialState
);

export const getCurrentTracks = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;
