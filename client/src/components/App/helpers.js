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
