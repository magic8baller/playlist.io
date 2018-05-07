import axios from 'axios';

const savePlaylistEndpoint = 'http://localhost:8080/api/playlist';

export const savePlaylist = ({ spotifyId, title, tracks }) => (dispatch) => {
  axios
    .post(savePlaylistEndpoint, { spotifyId, title, tracks })
    .then((res) => {
      const { playlistId } = res.data;
      dispatch({ type: 'SAVE_PLAYLIST', payload: { playlistId, title, tracks } });
    })
    .catch((err) => {
      console.log(err);
    });
};
