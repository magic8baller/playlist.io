import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicIcon from 'react-icons/lib/fa/music';
import AngleDown from 'react-icons/lib/fa/angle-down';
import AngleUp from 'react-icons/lib/fa/angle-up';
import queryString from 'query-string';

import {
  Wrapper,
  TabsWrapper,
  Title,
  TitleWrapper,
  NavText,
  nameStyle,
  Settings,
  AngleWrapper
} from './NavStyles.js';
import { signOutUser } from '../../actions/auth';

class Nav extends Component {
  renderNav = () => {
    console.log(this.props.location);
    return this.props.auth.isAuthenticated ? this.renderSignedIn() : this.renderSignedOut();
  };

  renderSignedOut = () => (
    <Wrapper>
      <TitleWrapper href="/">
        <Title href="/" style={nameStyle}>
          Playlist.io
        </Title>
        <MusicIcon size={22} />
      </TitleWrapper>
      <NavText>Welcome!</NavText>
    </Wrapper>
  );

  renderSignedIn = () => (
    <Wrapper>
      <TabsWrapper>
        <TitleWrapper href="/">
          <Title style={nameStyle}>Playlist.io</Title>
          <MusicIcon size={22} />
        </TitleWrapper>
        <NavText>Search</NavText>
        <NavText>Your Playlists</NavText>
        <NavText>Now Playing</NavText>
      </TabsWrapper>
      <div>
        <Settings onClick={() => this.props.signOutUser()}>
          <div>{this.props.auth.name}</div>
          <AngleWrapper>
            <AngleDown size={18} />
          </AngleWrapper>
        </Settings>
      </div>
    </Wrapper>
  );

  render() {
    return <div>{this.renderNav()}</div>;
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { signOutUser })(Nav);
