import React, { Component } from 'react';
import { Music, Heart } from 'react-feather';
import colors from '../../../utils/colors';

import {
  AllTrackWrapper,
  Left,
  TrackInfoWrapper,
  AllTrackName,
  AllTrackArtistName
} from '../../AllTracks/styles';

class FeaturedTrack extends Component {
  state = {
    isColored: this.props.track.isFavorited || false // use cached color state on initial render
  };

  // makes coloring/uncoloring the icon faster b/c each click
  // emits an AJAX request
  colorIcon = () => {
    this.setState({ isColored: true });
  };

  uncolorIcon = () => {
    this.setState({ isColored: false });
  };

  handleTrackClick = () => {
    const { playTrack, idx } = this.props;

    playTrack(idx);
  };

  handleFavoriteClick = () => {
    const { track } = this.props;
    const { userId, query, addFavorite, deleteFavorite } = this.props;

    // Higher order functions to reduce duplication
    const handleIsFavorited = this.handleFavoriting(deleteFavorite, this.uncolorIcon);
    const handleIsNotFavorited = this.handleFavoriting(addFavorite, this.colorIcon);

    track.isFavorited
      ? handleIsFavorited(userId, query, track)
      : handleIsNotFavorited(userId, query, track);
  };

  handleFavoriting = (favoriteAction, colorAction) => (...queryData) => {
    colorAction();
    favoriteAction(...queryData);
  };

  render() {
    const { isColored } = this.state;
    const { album: { artists }, name } = this.props.track;

    return (
      <AllTrackWrapper>
        <Left onClick={this.handleTrackClick}>
          {isColored ? <Music size={18} color={colors.primary} /> : <Music size={18} />}
          <TrackInfoWrapper>
            <AllTrackName>{name}</AllTrackName>
            <AllTrackArtistName>{artists[0].name}</AllTrackArtistName>
          </TrackInfoWrapper>
        </Left>
        <div>
          {isColored ? (
            <Heart
              onClick={this.handleFavoriteClick}
              size={16}
              color={colors.primary}
              fill={colors.primary}
            />
          ) : (
            <Heart onClick={this.handleFavoriteClick} size={16} />
          )}
        </div>
      </AllTrackWrapper>
    );
  }
}

export default FeaturedTrack;
