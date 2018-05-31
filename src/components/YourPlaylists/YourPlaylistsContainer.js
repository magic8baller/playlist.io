import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pipe, isEmpty } from 'ramda';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import YourPlaylists from './YourPlaylists';
import { setCurrentPlaylist } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { getSavedPlaylists } from '../../reducers/playlists';
import { getSpotifyId } from '../../reducers/auth';
import { getNoSavedPlaylistsError } from '../../reducers/errors';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper&sig=';

const isLoaded = ({ complete }) => complete;

const imagesAreLoaded = (imgElements) => imgElements.every(isLoaded);

const getImgElements = (parentNode) => [...parentNode.querySelectorAll('img')];

const getImageLoadState = (parentNode) => pipe(getImgElements, imagesAreLoaded)(parentNode);

class YourPlaylistsContainer extends Component {
  static propTypes = {
    savedPlaylists: arrayOf(
      shape({
        title: string.isRequired,
        _id: string,
        tracks: arrayOf(
          shape({
            artists: array,
            isFavorited: bool,
            id: string.isRequired,
            album: object.isRequired
          })
        )
      })
    ),
    setCurrentPlaylist: func.isRequired,
    setPath: func.isRequired,
    spotifyId: string.isRequired,
    noSavedPlaylistsError: string.isRequired
  };

  gridElement = null;

  state = {
    isLoaded: false
  };

  setGridElementRef = (element) => {
    this.gridElement = element;
  };

  handlePlaylistClick = (playlistId) => {
    const { setCurrentPlaylist, setPath, history } = this.props;

    setCurrentPlaylist(playlistId, () => {
      const newPath = '/playing';
      setPath(history, newPath);
    });
  };

  handleLoadedImg = () => {
    this.setState({
      isLoaded: getImageLoadState(this.gridElement)
    });
  };

  render() {
    const { savedPlaylists, noSavedPlaylistsError } = this.props;

    return isEmpty(savedPlaylists) ? (
      <ErrorPageContainer errorMsg={noSavedPlaylistsError} />
    ) : (
      <YourPlaylists {...this} {...this.state} {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  savedPlaylists: getSavedPlaylists(state),
  spotifyId: getSpotifyId(state),
  noSavedPlaylistsError: getNoSavedPlaylistsError(state)
});

export default connect(mapStateToProps, { setCurrentPlaylist, setPath })(YourPlaylistsContainer);
