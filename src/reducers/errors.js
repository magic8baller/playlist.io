import { handleActions } from 'redux-actions';

const initialState = {
  search: 'Invalid search. Please try again.',
  noSavedPlaylists: 'No playlists have been saved.',
  noCurrentPlaylist: false
};

export default handleActions(
  {
    NO_CURRENT_PLAYLIST_ERROR: (state, action) => ({
      ...state,
      noCurrentPlaylist: 'You must search for a playlist to view results.'
    }),
    CURRENT_PLAYLIST_SUCCESS: (state, action) => ({
      ...state,
      noCurrentPlaylist: false
    })
  },
  initialState
);

export const getSearchError = (state) => state.errors.search;

export const getNoSavedPlaylistsError = (state) => state.errors.noSavedPlaylists;

export const getNoCurrentPlaylistError = (state) => state.errors.noCurrentPlaylist;
