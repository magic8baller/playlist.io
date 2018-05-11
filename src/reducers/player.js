import { handleActions } from 'redux-actions';

const initialState = {
  isActivated: false, // activated === have they pressed play at least once
  isPlaying: false // playing === is the web player currently playing music
};

export default handleActions(
  {
    SET_DEVICE_ID: (state, action) => ({
      ...state,
      deviceId: action.payload
    }),
    SET_IS_ACTIVATED: (state, action) => ({
      ...state,
      isActivated: true
    }),
    TOGGLE_IS_PLAYING: (state, action) => ({
      ...state,
      isPlaying: !state.isPlaying
    })
  },
  initialState
);

export const getDeviceId = (state) => state.player.deviceId;

export const getIsActivated = (state) => state.player.isActivated;

export const getIsPlaying = (state) => state.player.isPlaying;
