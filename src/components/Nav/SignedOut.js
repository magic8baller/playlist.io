import React from 'react';

import * as Style from './NavStyles.js';
import MusicIcon from 'react-icons/lib/fa/music';

const SignedOut = () => (
  <Style.Wrapper>
    <Style.TitleWrapper>
      <Style.Title tyle={Style.nameStyle}>Playlist.io</Style.Title>
      <MusicIcon size={22} />
    </Style.TitleWrapper>
    <Style.NavText>Welcome!</Style.NavText>
  </Style.Wrapper>
);

export default SignedOut;
