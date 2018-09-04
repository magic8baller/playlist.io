import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './';
import Loading from '../Loading';

const pushTrack = (type) => (track, tracks) => tracks[type].push(track);

const pushPopular = pushTrack('popular');
const pushFeatured = pushTrack('featured');
const pushTrending = pushTrack('trending');
const pushOther = pushTrack('other');

class DashboardContainer extends Component {
  pushTracks = (tracks) => {
    const tracksByCategory = {
      featured: [],
      popular: [],
      trending: [],
      other: []
    };

    tracks.forEach((track, idx) => {
      if (idx < 6) {
        pushFeatured(track, tracksByCategory);
      } else if (idx < 9) {
        pushPopular(track, tracksByCategory);
      } else if (idx < 12) {
        pushTrending(track, tracksByCategory);
      } else {
        pushOther(track, tracksByCategory);
      }
    });

    return tracksByCategory;
  };

  render() {
    if (!this.props.tracks) return <Loading />;

    const tracks = this.pushTracks(this.props.tracks);

    return <Dashboard tracks={tracks} playTrack={this.props.playTrack} />;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.current
});

export default connect(mapStateToProps)(DashboardContainer);
