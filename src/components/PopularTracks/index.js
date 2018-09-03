import React from 'react';

import {
  Wrapper,
  PopularAlbumArt,
  PopularTrackName,
  PopularTrackWrapper,
  PopularArtistName,
  PopularTrackInfoWrapper
} from './styles';

const renderPopularTrack = ({ album: { artists, images }, name }, idx) => (
  <PopularTrackWrapper>
    <PopularAlbumArt src={images[1].url} />
    <PopularTrackInfoWrapper>
      <PopularTrackName>{name}</PopularTrackName>
      <PopularArtistName>{artists[0].name}</PopularArtistName>
    </PopularTrackInfoWrapper>
  </PopularTrackWrapper>
);

const PopularTracks = ({ popularTracks }) => (
  <Wrapper>{popularTracks.map(renderPopularTrack)}</Wrapper>
);

export default PopularTracks;
