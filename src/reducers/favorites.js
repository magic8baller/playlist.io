import { handleActions } from 'redux-actions';
import { find, propEq } from 'ramda';

const initialState = { all: [] };

export default handleActions(
  {
    ADD_FAVORITE_TRACK: (state, action) => {
      console.log(state.all);
      console.log(action.track);
      return {
        ...state
      };
    }
  },
  initialState
);

export const getFavorites = (state) => state.playlists.current;

export const getSavedPlaylists = (state) => state.playlists.saved;
