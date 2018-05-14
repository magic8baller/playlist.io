import React, { Component } from 'react';
import map from 'lodash/map';
import { pipe, isEmpty } from 'ramda';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { GridItem, styles } from './YourPlaylistsStyles';
import { Grid, TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { Headline, GridItemPlaceholder } from './YourPlaylistsPlaceholders';
import './styles.css';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper&sig=';

const isLoaded = ({ complete }) => complete;

const imagesAreLoaded = (imgElements) => imgElements.every(isLoaded);

const getImgElements = (parentNode) => [...parentNode.querySelectorAll('img')];

const getImageLoadState = (parentNode) => pipe(getImgElements, imagesAreLoaded)(parentNode);

const getClassName = (loaded) => (loaded ? 'grid__show' : 'grid__hide');

class YourPlaylists extends Component {
  gridElement = null;

  state = {
    loaded: false
  };

  componentDidMount() {
    const { playlists, spotifyId, fetchSavedPlaylists } = this.props;

    if (isEmpty(playlists)) fetchSavedPlaylists(spotifyId);
  }

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
      loaded: getImageLoadState(this.gridElement)
    });
  };

  renderPlaylist = ({ title, playlistId }, idx) => (
    <GridItem onClick={() => this.handlePlaylistClick(playlistId)} key={title} title={title}>
      <img
        alt={`Playlist: ${title}`}
        src={`${randomPicRoot}${idx}`}
        onLoad={this.handleLoadedImg}
      />
    </GridItem>
  );

  renderGridItemPlaceholder = () => {
    let result = [];

    for (let i = 0; i < 8; i++) {
      result = [...result, <GridItemPlaceholder key={i} />];
    }

    return result;
  };

  render() {
    const { savedPlaylists, noPlaylistsError } = this.props;
    const { loaded } = this.state;

    if (!savedPlaylists) return <ErrorPageContainer errorMsg={noPlaylistsError} />;

    const renderedPlaylists = map(savedPlaylists, this.renderPlaylist);

    return (
      <div>
        <TracksGridWrapper className={getClassName(loaded)}>
          <Text>🎶 Your Playlists</Text>
          <div style={styles.grid} ref={this.setGridElementRef}>
            {renderedPlaylists}
          </div>
        </TracksGridWrapper>
        {!loaded && (
          <div style={styles.placeholderWrapper}>
            <Headline />
            <div style={styles.gridItemPlaceholder}>{this.renderGridItemPlaceholder()}</div>
          </div>
        )}
      </div>
    );
  }
}

export default YourPlaylists;
