import { isError } from '../utils/helpers';

import api from '../api';
import { isUserError } from '../utils/helpers';
import { addFavoriteSuccess } from '../utils/dispatchHelpers';

const testTrackData = {
  id: '1',
  name: 'Awesome Song'
};

export const addFavorite = (spotifyId, query, trackData) => async (dispatch) => {
  const response = await api.addFavoriteSent(spotifyId, query, testTrackData);

  if (isError(response)) {
    console.log(response.data.error.message);
    return;
  }

  dispatch(addFavoriteSuccess(trackData));
};

export const deleteFavorite = (spotifyId, trackData) => async (dispatch) => {
  console.log('Delete favorite action');
};
