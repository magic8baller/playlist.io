import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import playlistsReducer from './playlists';
import navReducer from './nav';
import errorsReducer from './errors';

const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  playlists: playlistsReducer,
  nav: navReducer,
  errors: errorsReducer
});

export default appReducer;
