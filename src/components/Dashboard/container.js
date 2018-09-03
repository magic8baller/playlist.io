import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './';

class DashboardContainer extends Component {
  render() {
    const { tracks } = this.props;
    const topTracks = tracks.slice(0, 6);
    const allTracks = tracks.slice(6);
    console.log(allTracks);
    return <Dashboard topTracks={topTracks} allTracks={allTracks} />;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.current
});

export default connect(mapStateToProps)(DashboardContainer);
