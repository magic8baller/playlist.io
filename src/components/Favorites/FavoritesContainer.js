import React, { Component } from 'react';
import { connect } from 'react-redux';

import Favorites from './Favorites';
import { setIsPlaying, setIsActivated, setCurrentTrack, setCurrentIdx } from '../../actions/player';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';
import { getFavorites } from '../../reducers/favorites';
import { getNoSavedFavoritesError } from '../../reducers/errors';
import { playTrackEndpoint, playTrackReq } from '../App/helpers';

class FavoritesContainer extends React.Component {
  playTrack = (idx) => {
    const {
      deviceId,
      accessToken,
      favorites,
      setIsPlaying,
      setIsActivated,
      setCurrentTrack,
      setCurrentIdx
    } = this.props;

    const currentTrack = favorites[idx];

    fetch(playTrackEndpoint(deviceId), playTrackReq(currentTrack, accessToken));

    setCurrentIdx(idx);
    setCurrentTrack(currentTrack);
    setIsPlaying();
    setIsActivated();
  };

  render() {
    return <Favorites playTrack={this.playTrack} {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  noSavedFavoritesError: getNoSavedFavoritesError(state),
  accessToken: getAccessToken(state),
  deviceId: getDeviceId(state)
});

export default connect(mapStateToProps, {
  setIsPlaying,
  setIsActivated,
  setCurrentTrack,
  setCurrentIdx
})(FavoritesContainer);
