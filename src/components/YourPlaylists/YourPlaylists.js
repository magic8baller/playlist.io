import React, { Component } from 'react';
import map from 'lodash/map';
import { pipe, isEmpty } from 'ramda';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { GridItem, styles } from './YourPlaylistsStyles';
import { TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { Headline, GridItemPlaceholder } from './YourPlaylistsPlaceholders';
import './styles.css';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper&sig=';

const isLoaded = ({ complete }) => complete;

const imagesAreLoaded = (imgElements) => imgElements.every(isLoaded);

const getImgElements = (parentNode) => [...parentNode.querySelectorAll('img')];

const getImageLoadState = (parentNode) => pipe(getImgElements, imagesAreLoaded)(parentNode);

const getClassName = (isLoaded) => (isLoaded ? 'grid__show' : 'grid__hide');

class YourPlaylists extends Component {
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

  renderPlaceholder = (isLoaded) => (
    <div>
      <TracksGridWrapper className="grid__hide">
        <Text>
          <span role="img" aria-label="Music Notes">
            🎶
          </span>{' '}
          Your Playlists
        </Text>
        <div style={styles.grid} ref={this.setGridElementRef}>
          []
        </div>
      </TracksGridWrapper>
      <div style={styles.placeholderWrapper}>
        <Headline />
        <div style={styles.gridItemPlaceholder}>{this.renderGridItemPlaceholder()}</div>
      </div>
    </div>
  );

  renderGridItemPlaceholder = () => {
    let result = [];

    for (let i = 0; i < 8; i++) {
      result = [...result, <GridItemPlaceholder key={i} />];
    }

    return result;
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

  render() {
    const { savedPlaylists, noSavedPlaylistsError } = this.props;
    const { isLoaded } = this.state;

    const renderedPlaylists = map(savedPlaylists, this.renderPlaylist);

    if (isEmpty(savedPlaylists)) return <ErrorPageContainer errorMsg={noSavedPlaylistsError} />;

    return (
      <div>
        <TracksGridWrapper className={getClassName(isLoaded)}>
          <Text>
            <span role="img" aria-label="Music Notes">
              🎶
            </span>{' '}
            Your Playlists
          </Text>
          <div style={styles.grid} ref={this.setGridElementRef}>
            {renderedPlaylists}
          </div>
        </TracksGridWrapper>
        {!isLoaded && (
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
