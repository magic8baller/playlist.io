import { isError } from '../utils/helpers';

import api from '../api';
import favorites from '../utils/data/favorites';
import * as h from '../utils/dispatchHelpers';

const noSavedFavorites = (data) => data.favorites.error;

export const fetchAllFavorites = (spotifyId) => async (dispatch) => {
  const response = await api.fetchAllFavoritesSent(spotifyId);
  const { data } = response;

  if (noSavedFavorites(data)) return;

  dispatch(h.updateFavorites(response));
};

const favoriteAction = (apiReq) => (userId, query, trackData) => async (dispatch) => {
  const response = await apiReq(userId, query, trackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(h.updateFavorites(response));
  dispatch(h.updateCache(response));
  dispatch(h.updateCurrentPlaylist(response));
};

export const saveDemoFavorites = () => (dispatch) => {
  dispatch(h.saveDemoFavorites(favorites));
};

export const addFavorite = favoriteAction(api.addFavoriteSent);

export const deleteFavorite = favoriteAction(api.deleteFavoriteSent);
