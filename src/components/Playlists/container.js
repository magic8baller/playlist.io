import React, { Component } from 'react';
import { find, propEq } from 'ramda';
import { connect } from 'react-redux';

import { setCurrentPlaylist } from '../../actions/playlists';
import { setCurrentQuery } from '../../actions/search';
import Playlists from './';

class PlaylistsContainer extends Component {
  handlePlaylistClick = (playlistId) => async () => {
    const { setCurrentPlaylist, history, playlists, setCurrentQuery } = this.props;

    setCurrentPlaylist(playlistId, () => {
      const targetPlaylist = find(propEq('_id', playlistId), playlists);

      setCurrentQuery(targetPlaylist.query);

      history.push('/songs');
    });
  };

  render() {
    return (
      <Playlists playlists={this.props.playlists} handlePlaylistClick={this.handlePlaylistClick} />
    );
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.saved
});

export default connect(mapStateToProps, { setCurrentPlaylist, setCurrentQuery })(
  PlaylistsContainer
);
