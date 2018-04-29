import React from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Plus, Search } from 'react-feather';

import data from './data';
import * as Style from './NowPlayingStyles';

const renderTopFiveTrack = ({ album: { artists, images }, name }, idx) => (
  <Style.TrackWrapper key={`${name}-${idx}`}>
    <div>
      <img src={images[2].url} />
    </div>
    <Style.Data>
      <div>{name}</div>
      <Style.ArtistName>{artists[0].name}</Style.ArtistName>
    </Style.Data>
  </Style.TrackWrapper>
);

const NowPlaying = ({ current }) => {
  const topFiveTracks = current.slice(0, 5);
  const tracks = map(topFiveTracks, renderTopFiveTrack);

  return (
    <Style.Wrapper>
      <Style.ActionWrapper>
        <Plus size={20} style={Style.icon} />
        <Style.ActionText>Save</Style.ActionText>
      </Style.ActionWrapper>
      <Style.ContentWrapper>
        <Style.Picture>
          <img src="https://source.unsplash.com/user/rawpixel/800x500/?nature" />
        </Style.Picture>
        <Style.Tracks>{tracks}</Style.Tracks>
      </Style.ContentWrapper>
    </Style.Wrapper>
  );
};

const mapStateToProps = (state) => ({
  current: state.playlists.current
});

export default connect(mapStateToProps)(NowPlaying);
