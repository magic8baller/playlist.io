import React from 'react';
import { Music, Heart } from 'react-feather';

import {
  AllTracksWrapper,
  AllTrackWrapper,
  Left,
  TrackInfoWrapper,
  AllTrackName,
  AllTrackArtistName
} from './styles';

const renderAllTrack = ({ album: { artists, images }, name }, idx) => (
  <AllTrackWrapper>
    <Left>
      <Music size={18} />
      <TrackInfoWrapper>
        <AllTrackName>{name}</AllTrackName>
        <AllTrackArtistName>{artists[0].name}</AllTrackArtistName>
      </TrackInfoWrapper>
    </Left>
    <div>
      <Heart size={16} />
    </div>
  </AllTrackWrapper>
);

const AllTracks = ({ allTracks }) => (
  <AllTracksWrapper>{allTracks.map(renderAllTrack)}</AllTracksWrapper>
);

export default AllTracks;
