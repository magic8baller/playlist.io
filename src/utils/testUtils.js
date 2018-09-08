import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { mount } from 'enzyme';

import reducers from '../redux';

export const mountComponent = (Component, props = {}) => {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  const componentToMount = (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
  return mount(componentToMount);
};

export const sel = (id) => `[data-test="${id}"]`;

export const changeInputValue = (input, value) => {
  input.simulate('change', { target: { value } });
};

export const click = (input) => {
  input.simulate('click');
};

export const submit = (input) => {
  input.simulate('submit');
};
