import React from 'react';
import {
  TrendingTrackWrapper,
  TrendingTrackAlbumArt,
  TrendingTrackName,
  TrendingTrackArtist,
  TrendingTracksWrapper
} from './styles';

const renderTrendingTrack = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <TrendingTrackWrapper onClick={() => playTrack(idx + 9)} key={`${name}-${idx}`}>
    <TrendingTrackAlbumArt src={images[1].url} />
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
      <TrendingTrackName>{name}</TrendingTrackName>
      <TrendingTrackArtist>{artists[0].name}</TrendingTrackArtist>
    </div>
  </TrendingTrackWrapper>
);

const TrendingTracks = ({ trendingTracks, playTrack }) => (
  <TrendingTracksWrapper>
    {trendingTracks.map(renderTrendingTrack(playTrack))}
  </TrendingTracksWrapper>
);

export default TrendingTracks;
