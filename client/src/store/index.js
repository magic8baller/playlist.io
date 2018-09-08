import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { omit, curry, pipe } from 'ramda';

import reducers from '../reducers';
import { loadState, saveState } from './localStorage.js';

const key = 'state';
const stateToOmit = ['form', 'player'];

const persistedState = loadState(key);

const store = createStore(reducers, persistedState, applyMiddleware(reduxThunk));

store.subscribe(() => {
  const currState = store.getState();
  const persistedState = omit(stateToOmit, currState);
  saveState(persistedState, key);
});

export default store;
