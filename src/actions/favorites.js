import { isError } from '../utils/helpers';

import api from '../api';
import { isUserError } from '../utils/helpers';
import { addFavoriteSuccess, deleteFavoriteSuccess } from '../utils/dispatchHelpers';

const favoriteAction = (apiReq, successHelper) => (spotifyId, query, trackData) => async (
  dispatch
) => {
  const response = await apiReq(spotifyId, query, trackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(successHelper(trackData));
};

export const addFavorite = favoriteAction(api.addFavoriteSent, addFavoriteSuccess);

export const deleteFavorite = favoriteAction(api.deleteFavoriteSent, deleteFavoriteSuccess);
