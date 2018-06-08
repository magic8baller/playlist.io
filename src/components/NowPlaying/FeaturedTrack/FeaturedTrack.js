import React, { Component } from 'react';

import * as Style from './FeaturedTrackStyles';

class FeaturedTrack extends Component {
  state = {
    isColored: this.props.args[0].isFavorited || false // use cached color state on initial render
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
    const { playTrack } = this.props;
    const [, idx] = this.props.args;

    playTrack(idx);
  };

  handleFavoriteClick = () => {
    const trackData = this.props.args[0];
    const { spotifyId, query, addFavorite, deleteFavorite } = this.props;

    // Higher order functions to reduce duplication
    const handleIsFavorited = this.handleFavoriting(deleteFavorite, this.uncolorIcon);
    const handleIsNotFavorited = this.handleFavoriting(addFavorite, this.colorIcon);

    trackData.isFavorited
      ? handleIsFavorited(spotifyId, query, trackData)
      : handleIsNotFavorited(spotifyId, query, trackData);
  };

  handleFavoriting = (favoriteAction, colorAction) => (...queryData) => {
    colorAction();
    favoriteAction(...queryData);
  };

  render() {
    const [{ album: { artists, images }, name }, idx] = this.props.args;

    return (
      <Style.TrackWrapper key={`${name}-${idx}`}>
        <div onClick={this.handleTrackClick}>
          <img alt="Album" src={images[2].url} />
        </div>
        <Style.Data>
          <div onClick={this.handleTrackClick}>{name}</div>
          <Style.ArtistName onClick={this.handleTrackClick}>{artists[0].name}</Style.ArtistName>
          <Style.HeartIcon {...this.state} onClick={this.handleFavoriteClick} size={16} />
        </Style.Data>
      </Style.TrackWrapper>
    );
  }
}

export default FeaturedTrack;
