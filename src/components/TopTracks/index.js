import React from 'react';

import {
  TopTracksWrapper,
  TopTrackWrapper,
  AlbumArt,
  TopTrackArtistName,
  TopTrackName
} from './styles';

const renderTopTrack = ({ album: { artists, images }, name }, idx) => (
  <TopTrackWrapper>
    <AlbumArt src={images[0].url} />
    <TopTrackName>{name}</TopTrackName>
    <TopTrackArtistName>{artists[0].name}</TopTrackArtistName>
  </TopTrackWrapper>
);

const TopTracks = ({ topTracks }) => (
  <TopTracksWrapper>{topTracks.map(renderTopTrack)}</TopTracksWrapper>
);

export default TopTracks;
