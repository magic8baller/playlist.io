import axios from 'axios';

import { REFRESH_ACCESS_TOKEN_ENDPOINT } from '../utils/endpoints';

export default {
  refreshAccessTokenSent: (refreshToken) => {
    const config = {
      refresh_token: refreshToken
    };

    return axios.post(REFRESH_ACCESS_TOKEN_ENDPOINT, config);
  }
};
