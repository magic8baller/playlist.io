import React from 'react';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import { GridItem } from './YourPlaylistsStyles';
import { TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { Headline, GridItemPlaceholder } from './YourPlaylistsPlaceholders';
import './styles.css';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper&sig=';

const getClassName = (isLoaded) => (isLoaded ? 'grid__show' : 'grid__hide');

const YourPlaylists = (props) => (
  <div>
    <TracksGridWrapper className={getClassName(props.isLoaded)}>
      <Text>
        <span role="img" aria-label="Music Notes">
          🎶
        </span>{' '}
        Your Playlists
      </Text>
      <div className="grid" ref={props.setGridElementRef}>
        {props.savedPlaylists.map(renderPlaylist(props.handleLoadedImg, props.handlePlaylistClick))}
      </div>
    </TracksGridWrapper>
    {!props.isLoaded && (
      <div className="placeholder-wrapper">
        <Headline />
        <div className="grid grid-item-placeholder">{renderGridItemPlaceholder()}</div>
      </div>
    )}
  </div>
);

const renderPlaylist = (handleLoadedImg, handlePlaylistClick) => ({ title, playlistId }, idx) => (
  <GridItem onClick={() => handlePlaylistClick(playlistId)} key={title} title={title}>
    <img alt={`Playlist: ${title}`} src={`${randomPicRoot}${idx}`} onLoad={handleLoadedImg} />
  </GridItem>
);

const renderGridItemPlaceholder = () => {
  let result = [];

  for (let i = 0; i < 8; i++) {
    result = [...result, <GridItemPlaceholder key={i} />];
  }

  return result;
};

YourPlaylists.propTypes = {
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
  isLoaded: bool.isRequired,
  handleLoadedImg: func.isRequired,
  handlePlaylistClick: func.isRequired,
  setGridElementRef: func.isRequired
};

export default YourPlaylists;
