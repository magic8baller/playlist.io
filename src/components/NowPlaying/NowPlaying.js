import React, { Component } from 'react';
import map from 'lodash/map';
import { isEmpty } from 'ramda';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';
import NowPlayingLoader from './NowPlayingLoader';
import TracksGrid from '../TracksGrid/TracksGrid';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';

const randomPicEndpoint = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper';

const isNotLoaded = (current, loaded) => isEmpty(current) || !loaded;

class NowPlaying extends React.Component {
  state = {
    loaded: false
  };

  handleLoadedPic = () => {
    this.setState({ loaded: true });
  };

  renderTopFiveTrack = ({ album: { artists, images }, name }, idx) => (
    <Style.TrackWrapper key={`${name}-${idx}`}>
      <div>
        <img alt="Album" src={images[2].url} />
      </div>
      <Style.Data>
        <div>{name}</div>
        <Style.ArtistName>{artists[0].name}</Style.ArtistName>
      </Style.Data>
    </Style.TrackWrapper>
  );

  render() {
    const { current } = this.props;
    const { loaded } = this.state;

    if (isNotLoaded(current, loaded))
      return <NowPlayingLoader handleLoadedPic={this.handleLoadedPic} />;

    const currentCopy = [...current]; // copy the array instead of mutating directly
    const topFiveTracks = currentCopy.splice(0, 5);

    const tracks = map(topFiveTracks, this.renderTopFiveTrack);

    return (
      <div>
        <Style.Wrapper>
          <Style.ContentWrapper>
            <SaveAnimationContainer />
            <div>
              <Style.Picture>
                <SavePlaylistContainer />
                <Style.RandomPic alt="Random Pic" src={randomPicEndpoint} />
              </Style.Picture>
            </div>
            <div>
              <span>
                <span role="img" aria-label="Hallelujah">
                  🙌
                </span>{' '}
                Top 5 Songs
              </span>
              <Style.Tracks>{tracks}</Style.Tracks>
            </div>
          </Style.ContentWrapper>
        </Style.Wrapper>
        <Style.TracksGridWrapper>
          <TracksGrid allTracks={currentCopy} />
        </Style.TracksGridWrapper>
      </div>
    );
  }
}

export default NowPlaying;
