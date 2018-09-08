import React from 'react';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import { TrackTile } from './TrackStyle';

const Tracks = ({ nonFeaturedTracks, playTrack }) => nonFeaturedTracks.map(renderTrack(playTrack));

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

Tracks.propTypes = {
  nonFeaturedTracks: arrayOf(
    shape({
      artists: array.isRequired,
      isFavorited: bool,
      id: string.isRequired,
      album: object.isRequired
    })
  ),
  playTrack: func.isRequired
};

export default Tracks;
