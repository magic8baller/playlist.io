import React from 'react';

import Tracks from '../Tracks/Tracks';
import { Grid, GridWrapper, TracksGridWrapper, Text } from './TracksGridStyles';

const TracksGrid = (props) => (
  <TracksGridWrapper>
    <Text>🏅 Honorable Mentions</Text>
    <GridWrapper>
      <Grid cellHeight={180}>
        <Tracks {...props} />
      </Grid>
    </GridWrapper>
  </TracksGridWrapper>
);

export default TracksGrid;
