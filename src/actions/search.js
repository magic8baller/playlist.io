import { createAction } from 'redux-actions';

import api from '../api';
import * as h from '../utils/dispatchHelpers';
import { isError, isArtist } from '../utils/helpers';

export const returnCachedPlaylist = createAction('RETURN_CACHED_PLAYLIST');

export const setCurrentQuery = createAction('SET_CURRENT_QUERY');

export const fetchPlaylist = (spotifyId, token, query, mainDropdown) => async (dispatch) => {
  dispatch(h.deleteCurrentPlaylist());
  dispatch(h.currentPlaylistSuccess());

  const playlist = isArtist(mainDropdown)
    ? await getPlaylistByArtist(token, query)
    : await getPlaylistByGenre(token, query);

  if (isError(playlist)) {
    console.error(playlist.statusText);
    return;
  }

  const tracks = playlist.data.tracks.filter(hasImage);

  dispatch(h.fetchPlaylistSuccess(tracks));

  const cacheResponse = await api.cachePlaylistInDb(spotifyId, query, tracks);

  dispatch(h.updateCache(cacheResponse));
};

const getPlaylistByArtist = async (token, query) => {
  const artistData = await api.fetchArtist(token, query);
  const { id } = artistData.data.artists.items[0];

  return api.fetchPlaylistSent(token, id, 'seed_artists');
};

const getPlaylistByGenre = (token, query) => api.fetchPlaylistSent(token, query, 'seed_genres');

const hasImage = ({ album: { images } }) => images.length;
