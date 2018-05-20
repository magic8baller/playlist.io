import React, { Component } from 'react';

import * as Style from './FeaturedTrackStyles';

class FeaturedTrack extends Component {
  state = {
    shouldBeColored: null
  };

  colorIcon = () => {
    this.setState({ shouldBeColored: true });
  };

  uncolorIcon = () => {
    this.setState({ shouldBeColored: false });
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
    const handleIsFavorited = this.handleFavorited(deleteFavorite, this.uncolorIcon);
    const handleIsNotFavorited = this.handleFavorited(addFavorite, this.colorIcon);

    trackData.isFavorited
      ? handleIsFavorited(spotifyId, query, trackData)
      : handleIsNotFavorited(spotifyId, query, trackData);
  };

  handleFavorited = (favoriteAction, colorAction) => (...queryData) => {
    colorAction();
    favoriteAction(...queryData);
  };

  render() {
    const [{ album: { artists, images }, name, isFavorited }, idx] = this.props.args;

    return (
      <Style.TrackWrapper key={`${name}-${idx}`}>
        <div onClick={this.handleTrackClick}>
          <img alt="Album" src={images[2].url} />
        </div>
        <Style.Data>
          <div onClick={this.handleTrackClick}>{name}</div>
          <Style.ArtistName onClick={this.handleTrackClick}>{artists[0].name}</Style.ArtistName>
          <Style.HeartIcon
            {...this.state}
            onClick={this.handleFavoriteClick}
            isFavorited={isFavorited}
            size={16}
          />
        </Style.Data>
      </Style.TrackWrapper>
    );
  }
}

export default FeaturedTrack;
