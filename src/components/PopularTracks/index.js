import React from 'react';

import {
  Wrapper,
  PopularAlbumArt,
  PopularTrackName,
  PopularTrackWrapper,
  PopularArtistName,
  PopularTrackInfoWrapper
} from './styles';

const renderPopularTrack = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <PopularTrackWrapper onClick={() => playTrack(idx + 6)}>
    <PopularAlbumArt src={images[1].url} />
    <PopularTrackInfoWrapper>
      <PopularTrackName>{name}</PopularTrackName>
      <PopularArtistName>{artists[0].name}</PopularArtistName>
    </PopularTrackInfoWrapper>
  </PopularTrackWrapper>
);

const PopularTracks = ({ popularTracks, playTrack }) => (
  <Wrapper>{popularTracks.map(renderPopularTrack(playTrack))}</Wrapper>
);

export default PopularTracks;
