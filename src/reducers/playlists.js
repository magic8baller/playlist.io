import { handleActions } from 'redux-actions';

const initialState = { saved: [] };

export default handleActions(
  {
    ADD_PLAYLIST: (state, action) => ({
      ...state,
      current: [...action.payload]
    }),
    SAVE_PLAYLIST: (state, { payload: { playlistId, title, tracks } }) => {
      const newPlaylist = { playlistId, title, tracks };

      return {
        ...state,
        saved: [...state.saved, newPlaylist]
      };
    }
  },
  initialState
);

export const getCurrentTracks = (state) => state.playlists.current;
