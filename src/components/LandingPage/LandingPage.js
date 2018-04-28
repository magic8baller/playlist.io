import React from 'react';
import SpotifyLogo from 'react-icons/lib/fa/spotify';

import * as Style from './LandingPageStyles.js';

const LandingPage = ({}) => (
  <Style.Wrapper>
    <Style.CompanyName>Playlist.io</Style.CompanyName>
    <Style.Description>
      Automagically create Spotify playlists with a keyword search.
    </Style.Description>
    <Style.Btn>
      <SpotifyLogo size={30} style={Style.spotifyLogo} />
      <Style.BtnText>Log in with Spotify</Style.BtnText>
    </Style.Btn>
  </Style.Wrapper>
);

export default LandingPage;
