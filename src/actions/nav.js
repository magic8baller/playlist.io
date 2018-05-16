import { DOMAIN } from '../utils/endpoints';

export const setPath = (history, path) => (dispatch) => {
  dispatch({ type: 'SET_PATH', path });
  console.log(`${DOMAIN}${path}`);
  history.push(`${DOMAIN}${path}`);
};
