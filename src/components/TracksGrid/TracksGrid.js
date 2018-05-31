import React from 'react';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

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

TracksGrid.propTypes = {
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

export default TracksGrid;
