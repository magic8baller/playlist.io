import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyLogo from 'react-icons/lib/fa/spotify';
import queryString from 'query-string';
import { isEmpty } from 'ramda';

import * as Style from './LandingPageStyles.js';
import { signInUser } from '../../actions/auth';

const signInUserEndpoint = 'http://localhost:8080/api/authorize';

class LandingPage extends React.Component {
  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsed = queryString.parse(window.location.search);

    if (!isEmpty(parsed)) {
      signInUser(parsed);
      history.push('/search');
    }
  }

  handleBtnClick = () => {
    window.location = signInUserEndpoint;
  };

  render() {
    return (
      <Style.Wrapper>
        <Style.CompanyName>Playlist.io</Style.CompanyName>
        <Style.Description>
          Automagically create Spotify playlists with a keyword search.
        </Style.Description>
        <Style.Btn onClick={this.handleBtnClick}>
          <SpotifyLogo size={30} style={Style.spotifyLogo} />
          <Style.BtnText>Log in with Spotify</Style.BtnText>
        </Style.Btn>
      </Style.Wrapper>
    );
  }
}

export default connect(null, { signInUser })(LandingPage);
