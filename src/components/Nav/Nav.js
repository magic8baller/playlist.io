import React, { Component } from 'react';

import { Wrapper, NavText } from './NavStyles.js';

class Nav extends Component {
  render() {
    return (
      <Wrapper>
        <NavText>Playlist.io</NavText>
        <NavText>Welcome!</NavText>
      </Wrapper>
    );
  }
}

export default Nav;
