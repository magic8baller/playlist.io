import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Nav from '../Nav/Nav';
import { setCurrentPlaylist } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { GridItem } from './YourPlaylistsStyles';
import { Grid, TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';

const randomPicRoot = 'https://source.unsplash.com/user/tentides/452x452/weekly?wallpaper&sig=';

class YourPlaylists extends Component {
  handlePlaylistClick = (playlistId) => {
    const { setCurrentPlaylist, setPath, history } = this.props;

    setCurrentPlaylist(playlistId, () => {
      const newPath = '/playing';
      setPath(history, newPath);
    });
  };

  renderPlaylist = ({ title, playlistId }, idx) => (
    <GridItem onClick={() => this.handlePlaylistClick(playlistId)} key={title} title={title}>
      <img alt={`Playlist: ${title}`} src={`${randomPicRoot}${idx}`} />
    </GridItem>
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

export default connect(mapStateToProps, { setCurrentPlaylist, setPath })(YourPlaylists);
