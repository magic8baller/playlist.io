import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import SavePlaylist from './SavePlaylist';
import { savePlaylist } from '../../actions/playlists';
import { getSpotifyId, getAccessToken } from '../../reducers/auth';
import { getUserId } from '../../reducers/userId';
import { getCurrentQuery } from '../../reducers/search';
import { getCurrentTracks } from '../../reducers/playlists';

class SavePlaylistContainer extends Component {
  static propTypes = {
    spotifyId: string.isRequired,
    accessToken: string.isRequired,
    savePlaylist: func.isRequired,
    tracks: arrayOf(
      shape({
        artists: array.isRequired,
        isFavorited: bool,
        id: string.isRequired,
        album: object.isRequired
      })
    )
  };

  state = {
    open: false,
    title: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleKeyDown = (e) => {
    if (this.isEnterKey(e)) this.handleSubmit();
  };

  handleSubmit = () => {
    const { userId, spotifyId, tracks, savePlaylist, accessToken, query } = this.props;
    const { title } = this.state;

    const playlistData = { spotifyId, userId, title, tracks, accessToken, query };

    savePlaylist(playlistData, userId);
    this.handleClose();
  };

  isEnterKey = ({ key }) => key === 'Enter';

  render() {
    return <SavePlaylist {...this} {...this.props} {...this.state} />;
  }
}

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  userId: getUserId(state),
  accessToken: getAccessToken(state),
  tracks: getCurrentTracks(state),
  query: getCurrentQuery(state)
});

export default connect(mapStateToProps, { savePlaylist })(SavePlaylistContainer);
