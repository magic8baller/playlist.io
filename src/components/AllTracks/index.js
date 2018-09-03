import React from 'react';
import { Music, Heart } from 'react-feather';
import colors from '../../utils/colors';
import { AllTracksWrapper } from './styles';
import FeaturedTrackContainer from '../NowPlaying/FeaturedTrack/FeaturedTrackContainer';

const AllTracks = ({ allTracks, playTrack }) => (
  <AllTracksWrapper>
    {allTracks.map((track, idx) => (
      <FeaturedTrackContainer playTrack={playTrack} track={track} idx={idx + 12} />
    ))}
  </AllTracksWrapper>
);

export default AllTracks;
