import React, { Component } from 'react';
import map from 'lodash/map';
import { isEmpty } from 'ramda';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import TopTrackCard from '../TopTrackCard/TopTrackCard';
import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import WebPlayerContainer from '../WebPlayer/WebPlayerContainer';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';
import NowPlayingLoader from './NowPlayingLoader';
import TracksGrid from '../TracksGrid/TracksGrid';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';
import { randomPicEndpoint, pageIsLoading } from './helpers';

class NowPlaying extends React.Component {
  mapFeaturedTracks = ([topTrack, ...rest]) => {
    const featuredTracks = rest.splice(0, 5);
    const mappedFeaturedTracks = map(featuredTracks, this.renderFeaturedTrack);
    return [mappedFeaturedTracks, rest];
  };

  renderFeaturedTrack = ({ album: { artists, images }, name }, idx) => (
    <Style.TrackWrapper onClick={() => this.props.playTrack(idx)} key={`${name}-${idx}`}>
      <div>
        <img alt="Album" src={images[2].url} />
      </div>
      <Style.Data>
        <div>{name}</div>
        <Style.ArtistName>{artists[0].name}</Style.ArtistName>
      </Style.Data>
    </Style.TrackWrapper>
  );

  renderNowPlaying = () => {
    const { playTrack, currentPlaylist } = this.props;
    const topTrack = currentPlaylist[0];
    const [mappedFeaturedTracks, nonFeaturedTracks] = this.mapFeaturedTracks(currentPlaylist);

    return (
      <div>
        <Style.Wrapper>
          <Style.ContentWrapper>
            <SaveAnimationContainer />
            <div>
              <Style.Picture>
                <SavePlaylistContainer />
                <Style.TopTrackWrapper>
                  <TopTrackCard playTrack={playTrack} topTrack={topTrack} />
                </Style.TopTrackWrapper>
              </Style.Picture>
            </div>
            <div>
              <span>
                <span role="img" aria-label="Hallelujah">
                  🙌
                </span>{' '}
                Featured Tracks
              </span>
              <Style.Tracks>{mappedFeaturedTracks}</Style.Tracks>
            </div>
          </Style.ContentWrapper>
        </Style.Wrapper>
        <Style.TracksGridWrapper>
          <TracksGrid playTrack={this.props.playTrack} nonFeaturedTracks={nonFeaturedTracks} />
        </Style.TracksGridWrapper>
      </div>
    );
  };

  render() {
    const { currentPlaylist, searchError } = this.props;

    switch (true) {
      case pageIsLoading(currentPlaylist):
        return <NowPlayingLoader handleLoadedPic={this.handleLoadedPic} />;
      case isEmpty(currentPlaylist):
        return <ErrorPageContainer errorMsg={searchError} />;
      default:
        return this.renderNowPlaying();
    }
  }
}

export default NowPlaying;
