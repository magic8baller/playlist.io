import React, { Component } from 'react';
import MusicIcon from 'react-icons/lib/fa/music';

import { Wrapper, TitleWrapper, NavText, nameStyle } from './NavStyles.js';

class Nav extends Component {
  render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <NavText style={nameStyle}>Playlist.io</NavText>
          <MusicIcon size={22} />
        </TitleWrapper>
        <NavText>Welcome!</NavText>
      </Wrapper>
    );
  }
}

export default Nav;
