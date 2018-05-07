import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { GridTile } from 'material-ui/GridList';

import { Grid, GridWrapper, TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper&sig=';

class YourPlaylists extends Component {
  renderPlaylist = ({ title }, idx) => (
    <GridTile key={title} title={title}>
      <img alt={`Playlist: ${title}`} src={`${randomPicRoot}${idx}`} />
    </GridTile>
  );

  render() {
    const { playlists } = this.props;
    const renderedPlaylists = map(playlists, this.renderPlaylist);

    return (
      <TracksGridWrapper>
        <Text>🎶 Your Playlists</Text>
        <Grid>{renderedPlaylists}</Grid>
      </TracksGridWrapper>
    );
  }
}

export const getPlaylists = (state) => state.playlists.saved;

const mapStateToProps = (state) => ({
  playlists: getPlaylists(state)
});

export default connect(mapStateToProps)(YourPlaylists);
