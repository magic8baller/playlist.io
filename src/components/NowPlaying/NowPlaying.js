import React from 'react';
import map from 'lodash/map';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ScrollableAnchor from 'react-scrollable-anchor';

import * as Style from './NowPlayingStyles';
import TopTrackCard from '../TopTrackCard/TopTrackCard';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';
import FeaturedTrackContainer from './FeaturedTrack/FeaturedTrackContainer';
import TracksGrid from '../TracksGrid/TracksGrid';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';

const NowPlaying = ({ playTrack, currentPlaylist }) => {
  const topTrack = currentPlaylist[0];
  const [mappedFeaturedTracks, nonFeaturedTracks] = mapFeaturedTracks(currentPlaylist, playTrack);

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
            <Style.TextWrapper>
              <Style.FeaturedTracksEmoji role="img" aria-label="Hallelujah">
                🙌
              </Style.FeaturedTracksEmoji>{' '}
              Featured Tracks
            </Style.TextWrapper>
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
          <TracksGrid playTrack={playTrack} nonFeaturedTracks={nonFeaturedTracks} />
        </Style.TracksGridWrapper>
      </ScrollableAnchor>
    </div>
  );
};

const mapFeaturedTracks = ([topTrack, ...rest], playTrack) => {
  const featuredTracks = rest.splice(0, 5);
  const mappedFeaturedTracks = map(featuredTracks, renderFeaturedTrack(playTrack));
  return [mappedFeaturedTracks, rest];
};

const renderFeaturedTrack = (playTrack) => (...args) => (
  <FeaturedTrackContainer key={args[1]} args={args} playTrack={playTrack} />
);

NowPlaying.propTypes = {};

export default NowPlaying;
