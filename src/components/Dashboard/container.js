import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './';
import Loading from '../Loading';
import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';

const isEmpty = (tracks) => Object.keys(tracks).length === 0;

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
    const { tracks, playTrack } = this.props;

    if (tracks === '')
      return (
        <ErrorPageContainer
          headingText="Songs"
          errorMsg="You haven't searched for any artists yet."
        />
      );

    if (!tracks) return <Loading />;

    const formattedTracks = this.pushTracks(tracks);

    return <Dashboard tracks={formattedTracks} playTrack={playTrack} />;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.current,
  isDemoUser: state.auth.isDemoUser
});

export default connect(mapStateToProps)(DashboardContainer);
