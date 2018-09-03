import React from 'react';
import {
  TrendingTrackWrapper,
  TrendingTrackAlbumArt,
  TrendingTrackName,
  TrendingTrackArtist,
  TrendingTracksWrapper
} from './styles';

const renderTrendingTrack = ({ album: { artists, images }, name }, idx) => (
  <TrendingTrackWrapper>
    <TrendingTrackAlbumArt src={images[1].url} />
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
      <TrendingTrackName>{name}</TrendingTrackName>
      <TrendingTrackArtist>{artists[0].name}</TrendingTrackArtist>
    </div>
  </TrendingTrackWrapper>
);

const TrendingTracks = ({ trendingTracks }) => (
  <TrendingTracksWrapper>{trendingTracks.map(renderTrendingTrack)}</TrendingTracksWrapper>
);

export default TrendingTracks;
