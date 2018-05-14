import { handleActions } from 'redux-actions';

const initialState = { search: 'Invalid search. Please try again.' };

export default handleActions(
  {
    NO_SAVED_PLAYLISTS_ERROR: (state, action) => ({
      ...state,
      noPlaylists: action.payload.message
    })
  },
  initialState
);

export const getSearchError = (state) => state.errors.search;

export const getNoSavedPlaylistsError = (state) => state.errors.noPlaylists;
