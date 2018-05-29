import React from 'react';

import Tracks from '../Tracks/Tracks';
import { Grid, TracksGridWrapper, Text } from './TracksGridStyles';

const TracksGrid = (props) => (
  <TracksGridWrapper>
    <Text>
      <span role="img" aria-label="Medal">
        🏅
      </span>{' '}
      Honorable Mentions
    </Text>
    <Grid>
      <Tracks {...props} />
    </Grid>
  </TracksGridWrapper>
);

export default TracksGrid;
