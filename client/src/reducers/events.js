import { handleActions } from 'redux-actions';

const initialState = {
  isSaved: false,
  isInitialRender: true
};

export default handleActions(
  {
    TOGGLE_SAVE_ANIMATION: (state, action) => ({
      ...state,
      isSaved: !state.isSaved
    }),
    SET_IS_INITIAL_RENDER: (state, action) => ({
      ...state,
      isInitialRender: false
    })
  },
  initialState
);

export const getIsSaved = (state) => state.events.isSaved;

export const getIsInitialRender = (state) => state.events.isInitialRender;
