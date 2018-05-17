import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default ({ topTrack: { album: { artists, images }, name, popularity }, playTrack }) => (
  <Card onClick={() => playTrack()} style={{ cursor: 'pointer' }}>
    <CardMedia>
      <img src={images[0].url} alt="" />
    </CardMedia>
    <CardTitle title={name} subtitle={artists[0].name} />
  </Card>
);
