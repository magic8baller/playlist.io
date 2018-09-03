import React from 'react';
import styled from 'styled-components';

import Template from '../Template';
import { HeadingText } from '../Dashboard/styles';
import { Grid } from '../TracksGrid/TracksGridStyles';
import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  margin-top: 4.3rem;
  display: flex;
  flex-direction: column;
`;

export const Subtext = styled.div`
  margin-left: 1rem;
  opacity: 0.6;
  margin-top: -1.1rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaylistWrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(23, 43, 99, 0.26) 0 7px 42px;
`;

export const AlbumArt = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 4px 4px 0px 0px;
`;

export const TitleText = styled.div`
  margin-bottom: 0.2rem;
`;

export const SongCount = styled.div`
  opacity: 0.6;
  font-size: 14px;
`;

export const AnotherTextWrapper = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`;

const getAlbumArtForFirstTrack = ({ album: { images } }) => images[1].url;

const renderPlaylist = ({ title, tracks, idx }) => (
  <PlaylistWrapper>
    <AlbumArt src={getAlbumArtForFirstTrack(...tracks)} />
    <AnotherTextWrapper>
      <TitleText>{title}</TitleText>
      <SongCount>{tracks.length} songs</SongCount>
    </AnotherTextWrapper>
  </PlaylistWrapper>
);

const Playlists = ({ playlists }) => (
  <Template>
    <Wrapper>
      <TextWrapper>
        <HeadingText>Playlists</HeadingText>
        <Subtext>{playlists.length} playlists</Subtext>
      </TextWrapper>
      <div>
        <Grid>{playlists.map(renderPlaylist)}</Grid>
      </div>
    </Wrapper>
  </Template>
);

export default Playlists;
