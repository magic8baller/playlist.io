import React, { Component } from 'react';
import { connect } from 'react-redux';

import Playlists from './';

class PlaylistsContainer extends Component {
  render() {
    return <Playlists playlists={this.props.playlists} />;
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.saved
});

export default connect(mapStateToProps)(PlaylistsContainer);
