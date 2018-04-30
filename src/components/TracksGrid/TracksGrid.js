import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import map from 'lodash/map';

import { Grid, GridWrapper } from './TracksGridStyles';

const renderTrack = ({ album: { artists, images }, name }, idx) => (
  <GridTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
    <img src={images[0].url} />
  </GridTile>
);

const TracksGrid = ({ tracks }) => (
  <GridWrapper>
    <Grid cellHeight={180}>{map(tracks, renderTrack)}</Grid>
  </GridWrapper>
);

export default TracksGrid;
