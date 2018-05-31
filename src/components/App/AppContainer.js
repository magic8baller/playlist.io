import React from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, shape, array, bool, string, object, oneOfType } from 'prop-types';

import App from './App';
import { setIsPlaying, setIsActivated, setCurrentTrack, setCurrentIdx } from '../../actions/player';
import { getCurrentTracks } from '../../reducers/playlists';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';
import { getSearchError } from '../../reducers/errors';
import { playTrackEndpoint, playTrackReq } from './helpers';

class AppContainer extends React.Component {
  static propTypes = {
    currentPlaylist: oneOfType([
      string,
      arrayOf(
        shape({
          artists: array.isRequired,
          isFavorited: bool,
          id: string.isRequired,
          album: object.isRequired
        })
      )
    ]),
    accessToken: string,
    deviceId: string,
    searchError: string.isRequired,
    setIsPlaying: func.isRequired,
    setIsActivated: func.isRequired,
    setCurrentTrack: func.isRequired,
    setCurrentIdx: func.isRequired
  };

  playTrack = (idx = -1) => {
    const {
      deviceId,
      accessToken,
      currentPlaylist,
      setIsPlaying,
      setIsActivated,
      setCurrentTrack,
      setCurrentIdx
    } = this.props;

    const currentTrack = currentPlaylist[idx + 1];

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
})(AppContainer);
