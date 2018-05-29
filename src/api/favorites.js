import axios from 'axios';

import { FETCH_ALL_FAVORITES_ENDPOINT, FAVORITE_ENDPOINT } from '../utils/endpoints';

const favoriteApiReq = (method, reqType) => (spotifyId, query, trackData) =>
  axios[method](`${FAVORITE_ENDPOINT}/${spotifyId}`, {
    [reqType]: { query, trackData }
  });

export default {
  fetchAllFavoritesSent: (spotifyId) => axios.get(`${FETCH_ALL_FAVORITES_ENDPOINT}/${spotifyId}`),
  addFavoriteSent: favoriteApiReq('post', 'data'),
  deleteFavoriteSent: favoriteApiReq('delete', 'params')
};
