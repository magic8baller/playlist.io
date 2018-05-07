import React from 'react';

import Tracks from '../Tracks/Tracks';
import { Grid, GridWrapper, TracksGridWrapper, Text } from './TracksGridStyles';

const TracksGrid = (props) => (
  <TracksGridWrapper>
    <Text>🏅 Honorable Mentions</Text>
    <Grid>
      <Tracks {...props} />
    </Grid>
  </TracksGridWrapper>
);

export default TracksGrid;
