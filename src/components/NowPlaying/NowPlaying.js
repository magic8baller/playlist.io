import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import data from './data';
import { Wrapper, Picture, Tracks, TrackWrapper, Data, ArtistName } from './NowPlayingStyles';

const renderTrack = ({ album: { artists, images }, name }, idx) => (
  <TrackWrapper key={`${name}-${idx}`}>
    <div>
      <img src={images[2].url} />
    </div>
    <Data>
      <div>{name}</div>
      <ArtistName>{artists[0].name}</ArtistName>
    </Data>
  </TrackWrapper>
);

const NowPlaying = ({ current }) => {
  const tracks = map(current, renderTrack);

  return (
    <Wrapper>
      <Picture>
        <div>I am a picture</div>
      </Picture>
      <Tracks>{tracks}</Tracks>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  current: state.playlists.current
});

export default connect(mapStateToProps)(NowPlaying);
