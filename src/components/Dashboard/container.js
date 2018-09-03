import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './';

const pushTrack = (type) => (track, tracks) => tracks[type].push(track);

const pushPopular = pushTrack('popular');
const pushFeatured = pushTrack('featured');
const pushTrending = pushTrack('trending');
const pushOther = pushTrack('other');

class DashboardContainer extends Component {
  state = {
    tracks: {
      featured: [],
      popular: [],
      trending: [],
      other: []
    }
  };

  componentDidMount() {
    this.pushTracks();
  }

  pushTracks = () => {
    const tracks = Object.assign({}, this.state.tracks);

    this.props.tracks.forEach((track, idx) => {
      if (idx < 6) {
        pushFeatured(track, tracks);
      } else if (idx < 9) {
        pushPopular(track, tracks);
      } else if (idx < 12) {
        pushTrending(track, tracks);
      } else {
        pushOther(track, tracks);
      }
    });

    this.setState({ tracks });
  };

  render() {
    return <Dashboard tracks={this.state.tracks} />;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.current
});

export default connect(mapStateToProps)(DashboardContainer);
