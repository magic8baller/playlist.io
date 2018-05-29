import React from 'react';

import { TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { styles } from '../YourPlaylists/YourPlaylistsStyles';
import { TrackTile } from '../Tracks/TrackStyle';

const renderFavorite = ({ album: { artists, images }, name }, idx) => (
  <TrackTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" src={images[0].url} />
  </TrackTile>
);

const Favorites = ({ favorites }) => (
  <div>
    <TracksGridWrapper>
      <Text>
        <span role="img" aria-label="Fire">
          🔥
        </span>{' '}
        Favorites
      </Text>
      <div style={styles.grid} ref={this.setGridElementRef}>
        {favorites.map(renderFavorite)}
      </div>
    </TracksGridWrapper>
  </div>
);

export default Favorites;
