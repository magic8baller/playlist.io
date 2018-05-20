import React, { Component } from 'react';

import * as Style from './FeaturedTrackStyles';

class FeaturedTrack extends Component {
  state = {
    isFavorited: false
  };

  handleTrackClick = () => {
    const { playTrack } = this.props;
    const [, idx] = this.props.args;

    playTrack(idx);
  };

  handleFavoriteClick = () => {
    const trackData = this.props.args[0];
    const { spotifyId, addFavorite, deleteFavorite } = this.props;

    this.setState({ isFavorited: !this.state.isFavorited }, () => {
      this.state.isFavorited
        ? addFavorite(spotifyId, trackData)
        : deleteFavorite(spotifyId, trackData);
    });
  };

  render() {
    const [{ album: { artists, images }, name }, idx] = this.props.args;
    const { isFavorited } = this.state;

    return (
      <Style.TrackWrapper key={`${name}-${idx}`}>
        <div onClick={this.handleTrackClick}>
          <img alt="Album" src={images[2].url} />
        </div>
        <Style.Data>
          <div onClick={this.handleTrackClick}>{name}</div>
          <Style.ArtistName onClick={this.handleTrackClick}>{artists[0].name}</Style.ArtistName>
          <Style.HeartIcon onClick={this.handleFavoriteClick} {...this.state} size={16} />
        </Style.Data>
      </Style.TrackWrapper>
    );
  }
}

export default FeaturedTrack;
