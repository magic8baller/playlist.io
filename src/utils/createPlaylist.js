import axios from 'axios';
import { map, curry, flatten, sortBy, path, uniqBy, pipeP, pluck } from 'ramda';

/*
===== AJAX request =======
*/

const getPlaylistTracks = curry((config, playlist) => {
  const tracksEndpoint = playlist.tracks.href;
  return axios
    .get(tracksEndpoint, config)
    .then(({ data }) => data.items)
    .catch((err) => {});
});

/*
===== Helpers =======
*/

const getTop100Tracks = (tracks) => tracks.slice(tracks.length - 100).reverse();

const sortByPopularity = sortBy(path(['track', 'popularity']));

const byId = ({ track }) => track.id;

const uniqById = uniqBy(byId);

const mergePlaylistTracks = curry((config, playlists) =>
  Promise.all(map(getPlaylistTracks(config), playlists))
);

const createPlaylist = (playlists, config) =>
  pipeP(
    mergePlaylistTracks(config),
    flatten,
    uniqById,
    sortByPopularity,
    getTop100Tracks,
    pluck('track')
  )(playlists);

export default createPlaylist;
