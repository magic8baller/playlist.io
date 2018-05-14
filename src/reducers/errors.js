import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    SEARCH_ERROR: (state, action) => ({
      ...state,
      searchErrMsg: action.payload
    }),
    NO_PLAYLISTS_ERROR: (state, action) => ({
      ...state,
      noPlaylists: action.payload.message
    })
  },
  initialState
);

export const getNoPlaylistsError = (state) => state.errors.noPlaylists;
