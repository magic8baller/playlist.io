export const setPath = (history, path) => (dispatch) => {
  dispatch({ type: 'SET_PATH', path });
  history.push(path);
};
