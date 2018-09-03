import React from 'react';
import { AllTracksWrapper } from './styles';
import FeaturedTrackContainer from '../NowPlaying/FeaturedTrack/FeaturedTrackContainer';

const AllTracks = ({ allTracks, playTrack }) => (
  <AllTracksWrapper>
    {allTracks.map((track, idx) => (
      <FeaturedTrackContainer playTrack={playTrack} track={track} idx={idx + 12} key={idx} />
    ))}
  </AllTracksWrapper>
);

export default AllTracks;
