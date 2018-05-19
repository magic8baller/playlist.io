import React, { Component } from 'react';
import map from 'lodash/map';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ScrollableAnchor from 'react-scrollable-anchor';
import { isEmpty } from 'ramda';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import TopTrackCard from '../TopTrackCard/TopTrackCard';
import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import WebPlayerContainer from '../WebPlayer/WebPlayerContainer';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';
import NowPlayingLoader from './NowPlayingLoader';
import FeaturedTrackContainer from './FeaturedTrack/FeaturedTrackContainer';
import TracksGrid from '../TracksGrid/TracksGrid';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';
import { randomPicEndpoint, pageIsLoading } from './helpers';

class NowPlaying extends React.Component {
  mapFeaturedTracks = ([topTrack, ...rest]) => {
    const featuredTracks = rest.splice(0, 5);
    const mappedFeaturedTracks = map(featuredTracks, this.renderFeaturedTrack);
    return [mappedFeaturedTracks, rest];
  };

  renderFeaturedTrack = (...args) => (
    <FeaturedTrackContainer key={args[1]} args={args} playTrack={this.props.playTrack} />
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
            <Style.PictureWrapper>
              <Style.Picture>
                <SavePlaylistContainer />
                <Style.TopTrackWrapper>
                  <TopTrackCard playTrack={playTrack} topTrack={topTrack} />
                </Style.TopTrackWrapper>
              </Style.Picture>
            </Style.PictureWrapper>
            <Style.TracksWrapper>
              <span>
                <span role="img" aria-label="Hallelujah">
                  🙌
                </span>{' '}
                Featured Tracks
              </span>
              <Style.Tracks>{mappedFeaturedTracks}</Style.Tracks>
            </Style.TracksWrapper>
            <Style.FloatingBtnWrapper>
              <a href="#honorable-mentions">
                <FloatingActionButton backgroundColor={'#1db954'}>
                  <ArrowDownward />
                </FloatingActionButton>
              </a>
            </Style.FloatingBtnWrapper>
          </Style.ContentWrapper>
        </Style.Wrapper>
        <ScrollableAnchor id={'honorable-mentions'}>
          <Style.TracksGridWrapper>
            <TracksGrid playTrack={this.props.playTrack} nonFeaturedTracks={nonFeaturedTracks} />
          </Style.TracksGridWrapper>
        </ScrollableAnchor>
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
