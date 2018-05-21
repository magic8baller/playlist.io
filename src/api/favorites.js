import axios from 'axios';

import { FAVORITE_ENDPOINT } from '../utils/endpoints';

const favoriteApiReq = (method, reqType) => (spotifyId, query, trackData) =>
  axios[method](`${FAVORITE_ENDPOINT}/${spotifyId}`, {
    [reqType]: { spotifyId, query, trackData }
  });

export default {
  addFavoriteSent: favoriteApiReq('post', 'data'),
  deleteFavoriteSent: favoriteApiReq('delete', 'params')
};
