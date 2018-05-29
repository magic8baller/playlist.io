import { map, curry, flatten, sortBy, path, uniqBy, pipeP, pluck } from 'ramda';

import api from '../api';

const getTop100Tracks = (tracks) => tracks.slice(tracks.length - 100).reverse();

const sortByPopularity = sortBy(path(['track', 'popularity']));

const byId = ({ track }) => track.id;

const uniqById = uniqBy(byId);

const mergePlaylistTracks = curry((config, playlists) =>
  Promise.all(map(api.getPlaylistTracks(config), playlists))
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
