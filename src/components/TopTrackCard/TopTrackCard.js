import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

export default ({ topTrack: { album: { artists, images }, name, popularity }, playTrack }) => (
  <Card onClick={() => playTrack()} style={{ cursor: 'pointer' }}>
    <CardMedia>
      <img src={images[0].url} alt="" />
    </CardMedia>
    <CardTitle title={name} subtitle={artists[0].name} />
  </Card>
);
