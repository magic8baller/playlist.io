import React from 'react';

import Template from '../Template';
import { HeadingText } from '../Dashboard/styles';
import { Grid } from '../TracksGrid/TracksGridStyles';
import {
  Wrapper,
  TextWrapper,
  Subtext,
  PlaylistWrapper,
  AlbumArt,
  AnotherTextWrapper,
  TitleText,
  SongCount
} from './styles';

const getAlbumArtForFirstTrack = ({ album: { images } }) => images[1].url;

const renderPlaylist = (handlePlaylistClick) => ({ title, tracks, _id }) => (
  <PlaylistWrapper onClick={handlePlaylistClick(_id)} key={_id}>
    <AlbumArt src={getAlbumArtForFirstTrack(...tracks)} />
    <AnotherTextWrapper>
      <TitleText>{title}</TitleText>
      <SongCount>{tracks.length} songs</SongCount>
    </AnotherTextWrapper>
  </PlaylistWrapper>
);

const Playlists = ({ playlists, handlePlaylistClick }) => (
  <Template>
    <Wrapper>
      <TextWrapper>
        <HeadingText>Playlists</HeadingText>
        <Subtext>{playlists.length} playlists</Subtext>
      </TextWrapper>
      <div style={{ marginBottom: '10rem' }}>
        <Grid>{playlists.map(renderPlaylist(handlePlaylistClick))}</Grid>
      </div>
    </Wrapper>
  </Template>
);

export default Playlists;
