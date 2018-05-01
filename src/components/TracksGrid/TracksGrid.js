import React from 'react';

import GridItems from '../GridItems/GridItems';
import { Grid, GridWrapper, TracksGridWrapper, Text } from './TracksGridStyles';

const TracksGrid = (props) => {
  console.log(props);
  return (
    <TracksGridWrapper>
      <Text>🏅 Honorable Mentions</Text>
      <GridWrapper>
        <Grid cellHeight={180}>
          {/* <div>Hey</div> */}
          <GridItems {...props} />
        </Grid>
      </GridWrapper>
    </TracksGridWrapper>
  );
};

export default TracksGrid;
