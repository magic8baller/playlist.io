import React, { Component } from 'react';
import { find, propEq } from 'ramda';
import { connect } from 'react-redux';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { setCurrentPlaylist, saveDemoPlaylists } from '../../actions/playlists';
import { setCurrentQuery } from '../../actions/search';
import Playlists from './';

class PlaylistsContainer extends Component {
  componentDidMount() {
    const { isDemoUser, saveDemoPlaylists } = this.props;

    if (isDemoUser) {
      saveDemoPlaylists();
    }
  }

  handlePlaylistClick = (playlistId) => async () => {
    const { setCurrentPlaylist, history, playlists, setCurrentQuery } = this.props;

    setCurrentPlaylist(playlistId, () => {
      const targetPlaylist = find(propEq('_id', playlistId), playlists);

      setCurrentQuery(targetPlaylist.query);

      history.push('/songs');
    });
  };

  render() {
    const { playlists } = this.props;

    if (!playlists.length)
      return (
        <ErrorPageContainer
          errorMsg="No playlists have been saved."
          headingText="Playlists"
          subtext="0 playlists"
        />
      );

    return <Playlists playlists={playlists} handlePlaylistClick={this.handlePlaylistClick} />;
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.saved,
  isDemoUser: state.auth.isDemoUser
});

export default connect(mapStateToProps, { setCurrentPlaylist, setCurrentQuery, saveDemoPlaylists })(
  PlaylistsContainer
);
