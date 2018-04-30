import React from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Plus, Search } from 'react-feather';

import TracksGrid from '../TracksGrid/TracksGrid';
import data from './data';
import * as Style from './NowPlayingStyles';

const randomPic = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper';

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
  current = [...current]; // copy the array instead of mutating directly
  const topFiveTracks = current.splice(0, 5);
  const tracks = map(topFiveTracks, renderTopFiveTrack);

  return (
    <div>
      <Style.Wrapper>
        <Style.ActionWrapper>
          <Plus size={20} style={Style.icon} />
          <Style.ActionText>Save Playlist</Style.ActionText>
        </Style.ActionWrapper>
        <Style.ContentWrapper>
          <Style.Picture>
            <img src={randomPic} />
          </Style.Picture>
          <div>
            <span>🙌 Top 5 Songs</span>
            <Style.Tracks>{tracks}</Style.Tracks>
          </div>
        </Style.ContentWrapper>
      </Style.Wrapper>
      <Style.TracksGridWrapper>
        <TracksGrid tracks={current} />
      </Style.TracksGridWrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.playlists.current
});

export default connect(mapStateToProps)(NowPlaying);
