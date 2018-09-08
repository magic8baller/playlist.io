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
    SET_IS_ACTIVATED: (state) => ({
      ...state,
      isActivated: true
    }),
    SET_IS_PLAYING: (state) => ({
      ...state,
      isPlaying: true
    }),
    SET_CURRENT_TRACK: (state, action) => ({
      ...state,
      currentTrack: action.payload
    }),
    SET_CURRENT_IDX: (state, action) => ({
      ...state,
      currentIdx: action.payload
    }),
    TOGGLE_IS_PLAYING: (state) => ({
      ...state,
      isPlaying: !state.isPlaying
    })
  },
  initialState
);

export const getDeviceId = (state) => state.player.deviceId;

export const getIsActivated = (state) => state.player.isActivated;

export const getIsPlaying = (state) => state.player.isPlaying;

export const getCurrentTrack = (state) => state.player.currentTrack;

export const getCurrentIdx = (state) => state.player.currentIdx;
