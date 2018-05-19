import { isError } from '../utils/helpers';

import api from '../api';
import { isUserError } from '../utils/helpers';
import { addFavoriteSuccess } from '../utils/dispatchHelpers';

export const addFavorite = (spotifyId, spotifyData) => async (dispatch) => {
  const response = await api.addFavoriteSent(spotifyId, spotifyData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(addFavoriteSuccess(spotifyData));
};

export const deleteFavorite = (targetId) => async (dispatch) => {
  console.log('Delete favorite action');
};
