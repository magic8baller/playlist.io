import { createAction } from 'redux-actions';

export const signInUser = createAction('AUTH_USER');
export const signOutUser = createAction('UNAUTH_USER');
