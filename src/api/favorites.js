import axios from 'axios';

import { ADD_FAVORITE_ENDPOINT, DELETE_FAVORITE_ENDPOINT } from '../utils/endpoints';

export default {
  addFavoriteSent: (spotifyId, spotifyData) =>
    axios.post(ADD_FAVORITE_ENDPOINT, { spotifyId, spotifyData })
};
