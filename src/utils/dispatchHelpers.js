export const setPathSuccess = (path) => ({
  type: 'SET_PATH',
  path
});

export const savePlaylistSuccess = (playlistId, { title, tracks }) => ({
  type: 'SAVE_PLAYLIST',
  payload: { playlistId, title, tracks }
});

export const setCurrentPlaylistSuccess = (playlistId) => ({
  type: 'SET_CURRENT_PLAYLIST',
  playlistId
});

export const fetchSavedPlaylistsError = ({ error }) => ({
  type: 'NO_SAVED_PLAYLISTS_ERROR',
  message: error.message
});

export const fetchSavedPlaylistsSuccess = ({ playlists }) => ({
  type: 'FETCH_SAVED_PLAYLISTS',
  playlists
});

export const resolveCurrentPlaylist = () => ({
  type: 'RESOLVE_CURRENT_PLAYLIST'
});

export const fetchPlaylistSuccess = (playlist, query) => ({
  type: 'ADD_PLAYLIST',
  playlist,
  query
});

export const deleteCurrentPlaylist = () => ({
  type: 'DELETE_CURRENT_PLAYLIST'
});

export const updateFavorites = ({ data }) => ({
  type: 'UPDATE_FAVORITES',
  favorites: data.favorites
});

export const updateCache = ({ data }) => ({
  type: 'UPDATE_CACHE',
  cache: data.cache
});

export const updateCurrentPlaylist = ({ data }) => ({
  type: 'UPDATE_CURRENT_PLAYLIST',
  current: data.current
});
