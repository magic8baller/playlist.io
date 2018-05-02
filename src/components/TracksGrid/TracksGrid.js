import React from 'react';

import GridItems from '../GridItems/GridItems';
import { Grid, GridWrapper, TracksGridWrapper, Text } from './TracksGridStyles';

const TracksGrid = (props) => (
  <TracksGridWrapper>
    <Text>🏅 Honorable Mentions</Text>
    <GridWrapper>
      <Grid cellHeight={180}>
        <GridItems {...props} />
      </Grid>
    </GridWrapper>
  </TracksGridWrapper>
);

export default TracksGrid;
