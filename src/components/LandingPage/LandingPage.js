import React from 'react';
import queryString from 'query-string';
import { isEmpty } from 'ramda';

import * as Style from './LandingPageStyles.js';

const signInUserEndpoint = 'http://localhost:8080/api/authorize';

class LandingPage extends React.Component {
  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsed = queryString.parse(window.location.search);

    if (!isEmpty(parsed)) {
      signInUser(parsed);
      history.push('/');
    }
  }

  handleBtnClick = () => {
    window.location = signInUserEndpoint;
  };

  render() {
    return (
      <Style.Wrapper>
        <Style.InnerWrapper>
          <Style.CompanyName>Playlist.io</Style.CompanyName>
          <Style.Description>
            Automagically create Spotify playlists with a keyword search.
          </Style.Description>
          <Style.Btn onClick={this.handleBtnClick}>
            <Style.BtnText>Log in with Spotify</Style.BtnText>
          </Style.Btn>
        </Style.InnerWrapper>
      </Style.Wrapper>
    );
  }
}

export default LandingPage;
