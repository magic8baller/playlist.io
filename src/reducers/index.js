import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import errorsReducer from './errors';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  errors: errorsReducer
});

export default rootReducer;
