import { isEmpty } from 'ramda';

export const randomPicEndpoint = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper';

export const getUri = ({ uri }) => uri;

export const playTrackEndpoint = (deviceId) =>
  `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

export const playTrackReq = ({ uri }, accessToken) => ({
  method: 'PUT',
  body: JSON.stringify({ uris: [uri] }),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
});

export const isNotLoaded = (current, loaded) => isEmpty(current) || !loaded;
