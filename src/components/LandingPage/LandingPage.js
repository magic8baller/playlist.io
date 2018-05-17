import React from 'react';

import * as Style from './LandingPageStyles.js';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (isLoaded) => (isLoaded ? '' : 'wrapper__hide');

export default ({ isLoaded, handleBtnClick, handleLoadedImg }) => (
  <div>
    <Style.Wrapper className={getClassName(isLoaded)}>
      <BackgroundImg onLoad={handleLoadedImg} src={require('./landing-page.jpg')} />
      <Style.InnerWrapper>
        <Style.CompanyName>Playlist.io</Style.CompanyName>
        <Style.Description>
          Automagically create Spotify playlists with a keyword search.
        </Style.Description>
        <Style.Btn onClick={handleBtnClick}>
          <Style.BtnText>Log in with Spotify</Style.BtnText>
        </Style.Btn>
      </Style.InnerWrapper>
    </Style.Wrapper>
    {!isLoaded && (
      <HomePlaceholderWrapper>
        <HomeBackgroundPlaceholder />
      </HomePlaceholderWrapper>
    )}
  </div>
);
