import React from 'react';
import queryString from 'query-string';
import { isEmpty } from 'ramda';

import * as Style from './LandingPageStyles.js';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (loaded) => (loaded ? '' : 'wrapper__hide');

const signInUserEndpoint = 'http://localhost:8080/api/authorize';

class LandingPage extends React.Component {
  state = {
    loaded: false
  };

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

  handleLoadedImg = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;

    return (
      <div>
        <Style.Wrapper className={getClassName(loaded)}>
          <BackgroundImg
            onLoad={this.handleLoadedImg}
            src="https://source.unsplash.com/cZWZjymwI9o/1600x900"
          />
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
        {!loaded && (
          <HomePlaceholderWrapper>
            <HomeBackgroundPlaceholder />
          </HomePlaceholderWrapper>
        )}
      </div>
    );
  }
}

export default LandingPage;
