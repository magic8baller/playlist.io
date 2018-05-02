import React from 'react';
import { GridTile } from 'material-ui/GridList';
import map from 'lodash/map';

const imgStyle = {
  backgroundColor: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))'
};

const renderTrack = ({ album: { artists, images }, name }, idx) => (
  <GridTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" style={imgStyle} src={images[0].url} />
  </GridTile>
);

const GridItems = ({ allTracks }) => map(allTracks, renderTrack);

export default GridItems;
