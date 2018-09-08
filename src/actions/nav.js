import { setPathSuccess } from '../utils/dispatchHelpers';

export const setPath = (history, path) => (dispatch) => {
  dispatch(setPathSuccess(path));
  history.push(path);
};
