import React from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import NowPlaying from './NowPlaying';
import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import NowPlayingLoader from './NowPlayingLoader';
import { pageIsLoading, isError } from './helpers';
import { getCurrentTracks } from '../../reducers/playlists';
import { getSearchError } from '../../reducers/errors';

class NowPlayingContainer extends React.Component {
  static propTypes = {
    currentPlaylist: arrayOf(
      shape({
        artists: array.isRequired,
        isFavorited: bool,
        id: string.isRequired,
        album: object.isRequired
      })
    ),
    searchError: string.isRequired,
    playTrack: func.isRequired
  };

  render() {
    const { currentPlaylist, searchError, ...rest } = this.props;

    switch (true) {
      case isError(currentPlaylist):
        return <ErrorPageContainer errorMsg={searchError} />;
      case pageIsLoading(currentPlaylist):
        return <NowPlayingLoader />;
      default:
        return <NowPlaying currentPlaylist={currentPlaylist} {...rest} />;
    }
  }
}

const mapStateToProps = (state, { playTrack }) => ({
  currentPlaylist: getCurrentTracks(state),
  searchError: getSearchError(state),
  playTrack
});

export default connect(mapStateToProps, {})(NowPlayingContainer);
