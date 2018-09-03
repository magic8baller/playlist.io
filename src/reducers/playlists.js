import { handleActions } from 'redux-actions';
import { find, propEq } from 'ramda';

const initialState = { saved: [], current: '', cache: [] };

export default handleActions(
  {
    SET_CURRENT_PLAYLIST: (state, action) => {
      const { playlistId } = action;
      const newCurrentPlaylist = find(propEq('_id', playlistId), state.saved);

      return {
        ...state,
        current: newCurrentPlaylist.tracks
      };
    },
    ADD_PLAYLIST: (state, action) => ({
      ...state,
      current: [...action.playlist],
      cache: [...state.cache, ...action.playlist]
    }),
    UPDATE_ALL_PLAYLISTS: (state, action) => ({
      ...state,
      saved: action.saved,
      cache: action.cache
    }),
    UPDATE_CURRENT_PLAYLIST: (state, action) => ({
      ...state,
      current: action.current
    }),
    RETURN_CACHED_PLAYLIST: (state, action) => ({
      ...state,
      current: action.payload
    }),
    UPDATE_CACHE: (state, action) => ({
      ...state,
      cache: action.cache
    }),
    SAVE_PLAYLIST: (state, action) => ({
      ...state,
      saved: [...state.saved, action.payload]
    }),
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
      saved: action.playlists
    })
  },
  initialState
);

export const getCurrentTracks = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;

export const getCache = (state) => state.playlists.cache;
