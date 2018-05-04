import React from 'react';
import { GridTile } from 'material-ui/GridList';
import map from 'lodash/map';

const renderTrack = ({ album: { artists, images }, name }, idx) => (
  <GridTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" src={images[0].url} />
  </GridTile>
);

const Tracks = ({ allTracks }) => map(allTracks, renderTrack);

export default Tracks;
