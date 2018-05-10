import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    SET_DEVICE_ID: (state, action) => ({
      ...state,
      deviceId: action.payload
    })
  },
  initialState
);

export const getDeviceId = (state) => state.playlists.current;
