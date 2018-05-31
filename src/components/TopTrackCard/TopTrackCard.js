import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { arrayOf, shape, array, bool, string, object } from 'prop-types';

const TopTrackCard = ({
  topTrack: { album: { artists, images }, name, popularity },
  playTrack
}) => (
  <Card onClick={() => playTrack()} style={{ cursor: 'pointer' }}>
    <CardMedia>
      <img src={images[0].url} alt="" />
    </CardMedia>
    <CardTitle title={name} subtitle={artists[0].name} />
  </Card>
);

TopTrackCard.propTypes = {
  topTrackCard: arrayOf(
    shape({
      artists: array.isRequired,
      isFavorited: bool,
      id: string.isRequired,
      album: object.isRequired
    })
  )
};

export default TopTrackCard;
