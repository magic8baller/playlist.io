import React from 'react';
import map from 'lodash/map';
import { curry, addIndex } from 'ramda';

import { TrackTile } from './TrackStyle';

const mapIndexed = addIndex(map);

const renderTrack = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <TrackTile
    onClick={() => playTrack(idx + 5)} // offset 5 b/c of top five tracks have already been rendered
    key={`${name}-${idx}`}
    title={name}
    subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" src={images[0].url} />
  </TrackTile>
);

const Tracks = ({ nonTopFiveTracks, playTrack }) => nonTopFiveTracks.map(renderTrack(playTrack));

export default Tracks;
