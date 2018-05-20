import { isError } from '../utils/helpers';

import api from '../api';
import { isUserError } from '../utils/helpers';
import { updateFavorites, updateCache } from '../utils/dispatchHelpers';

const favoriteAction = (apiReq) => (spotifyId, query, trackData) => async (dispatch) => {
  const response = await apiReq(spotifyId, query, trackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(updateFavorites(response));
  dispatch(updateCache(response));
};

export const addFavorite = favoriteAction(api.addFavoriteSent);

export const deleteFavorite = favoriteAction(api.deleteFavoriteSent);
