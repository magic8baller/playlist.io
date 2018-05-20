import { isError } from '../utils/helpers';

import api from '../api';
import { isUserError } from '../utils/helpers';
import { addFavoriteSuccess } from '../utils/dispatchHelpers';

export const addFavorite = (spotifyId, trackData) => async (dispatch) => {
  const response = await api.addFavoriteSent(spotifyId, trackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(addFavoriteSuccess(trackData));
};

export const deleteFavorite = (spotifyId, trackData) => async (dispatch) => {
  console.log('Delete favorite action');
};
