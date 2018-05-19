import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import playlistsReducer from './playlists';
import navReducer from './nav';
import errorsReducer from './errors';
import eventsReducer from './events';
import playerReducer from './player';
import favoritesReducer from './favorites';

const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  playlists: playlistsReducer,
  nav: navReducer,
  errors: errorsReducer,
  events: eventsReducer,
  player: playerReducer,
  favorites: favoritesReducer
});

// clear state on sign out
const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT_USER') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
