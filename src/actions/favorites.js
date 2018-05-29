import { isError } from '../utils/helpers';

import api from '../api';
import { updateFavorites, updateCache, updateCurrentPlaylist } from '../utils/dispatchHelpers';

const favoriteAction = (apiReq) => (spotifyId, query, trackData) => async (dispatch) => {
  const response = await apiReq(spotifyId, query, trackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(updateFavorites(response));
  dispatch(updateCache(response));
  dispatch(updateCurrentPlaylist(response));
};

export const addFavorite = favoriteAction(api.addFavoriteSent);

export const deleteFavorite = favoriteAction(api.deleteFavoriteSent);
