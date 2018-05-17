import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from './App';
import { setIsPlaying, setIsActivated, setCurrentTrack, setCurrentIdx } from '../../actions/player';
import { getCurrentTracks } from '../../reducers/playlists';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';
import { getSearchError } from '../../reducers/errors';

const playTrackEndpoint = (deviceId) =>
  `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

const playTrackReq = ({ uri }, accessToken) => ({
  method: 'PUT',
  body: JSON.stringify({ uris: [uri] }),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
});

class AppContainer extends React.Component {
  playTrack = (idx = 0) => {
    const {
      deviceId,
      accessToken,
      currentPlaylist,
      setIsPlaying,
      setIsActivated,
      setCurrentTrack,
      setCurrentIdx
    } = this.props;

    const currentTrack = currentPlaylist[idx];

    fetch(playTrackEndpoint(deviceId), playTrackReq(currentTrack, accessToken));

    setCurrentIdx(idx);
    setCurrentTrack(currentTrack);
    setIsPlaying();
    setIsActivated();
  };

  render() {
    return <App currentPlaylist={this.props.currentPlaylist} playTrack={this.playTrack} />;
  }
}

const mapStateToProps = (state) => ({
  currentPlaylist: getCurrentTracks(state),
  accessToken: getAccessToken(state),
  deviceId: getDeviceId(state),
  searchError: getSearchError(state)
});

export default connect(mapStateToProps, {
  setIsPlaying,
  setIsActivated,
  setCurrentTrack,
  setCurrentIdx
})(App);
