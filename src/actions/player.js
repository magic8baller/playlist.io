import { createAction } from 'redux-actions';

export const setDeviceId = createAction('SET_DEVICE_ID');

export const setIsActivated = createAction('SET_IS_ACTIVATED');

export const setIsPlaying = createAction('SET_IS_PLAYING');

export const setCurrentTrack = createAction('SET_CURRENT_TRACK');

export const setCurrentIdx = createAction('SET_CURRENT_IDX');

export const toggleIsPlaying = createAction('TOGGLE_IS_PLAYING');
