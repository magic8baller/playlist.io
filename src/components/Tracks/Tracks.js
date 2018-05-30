import React from 'react';

import { TrackTile } from './TrackStyle';

const renderTrack = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <TrackTile
    onClick={() => playTrack(idx + 5)} // offset 5 b/c of top five tracks have already been rendered
    key={`${name}-${idx}`}
    title={name}
    subtitle={<span>{artists[0].name}</span>}
    style={{ marginRight: '18px' }}>
    <img alt="Album" src={images[0].url} />
  </TrackTile>
);

const Tracks = ({ nonFeaturedTracks, playTrack }) => nonFeaturedTracks.map(renderTrack(playTrack));

export default Tracks;
