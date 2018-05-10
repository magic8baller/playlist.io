export default (dispatch) => {
  window.setTimeout(() => runSaveAnimation(dispatch), 1000); // === 2 seconds
};

const runSaveAnimation = (dispatch) => {
  dispatch({ type: 'TOGGLE_SAVE_ANIMATION' });
};
