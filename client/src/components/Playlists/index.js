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
import { getSubtext } from '../../utils/helpers';

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
  <Template headingText="Playlists" subtext={getSubtext(playlists, 'playlist')}>
    <div style={{ marginBottom: '10rem' }}>
      <Grid>{playlists.map(renderPlaylist(handlePlaylistClick))}</Grid>
    </div>
  </Template>
);

export default Playlists;
