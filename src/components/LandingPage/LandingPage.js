import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Github, Twitter, Linkedin, Download, Search, Headphones } from 'react-feather';
import colors from '../../utils/colors';
import ReactLoading from 'react-loading';

import {
  Wrapper,
  Header,
  Title,
  Text,
  Body,
  MainText,
  Description,
  Button,
  SignUpText,
  StyledLink,
  DemoText,
  FeaturesWrapper,
  FeaturesHeadingText,
  FeaturesSubheadingText,
  FeaturesIconWrapper,
  FeaturesIconsWrapper,
  FeaturesDescriptionText,
  StyledATag,
  Footer,
  CopyrightText,
  SocialIcons,
  SecondaryButton
} from './LandingPageStyles';

const ICON_SIZE = 40;
const SOCIAL_ICON_SIZE = 16;
const LOADING_SIZE = 25;

const LandingPage = ({ handleAuth, handleDemoClick, isLoading }) => (
  <Wrapper>
    <Header>
      <div>
        <Title>Playlist.io</Title>
      </div>
      <div>
        <Text onClick={handleAuth}>Start</Text>
      </div>
    </Header>
    <Body>
      <MainText>Create Spotify playlists with a keyword search</MainText>
      <Description>The easiest way to create a playlist.</Description>
      <Button onClick={handleAuth}>
        {isLoading ? (
          <ReactLoading type="spinningBubbles" height={LOADING_SIZE} width={LOADING_SIZE} />
        ) : (
          'Start'
        )}
      </Button>
      <SecondaryButton onClick={handleDemoClick}>Demo</SecondaryButton>
    </Body>
    <Features />
    <Images />
    <Footer_ />
  </Wrapper>
);

const Images = () => (
  <div>
    <div style={{ display: 'flex', marginTop: '8rem' }}>
      <div>
        <img
          style={{ height: '300px', width: '600px', borderRadius: '4px', marginRight: '2rem' }}
          src={require('./search.png')}
        />
      </div>
      <div>
        <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>Simple Search</div>
        <span style={{ opacity: '.7' }}>
          Search for your favorite artists and receive a recommended playlist in seconds.
        </span>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8rem' }}>
      <div>
        <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>Music Dashhboard</div>
        <span style={{ opacity: '.7' }}>
          Choose from hundreds of songs and play them directly in the browser
        </span>
      </div>
      <div>
        <img
          style={{ height: '300px', width: '600px', borderRadius: '4px', marginRight: '2rem' }}
          src={require('./dashboard.png')}
        />
      </div>
    </div>
  </div>
);

const Features = () => (
  <FeaturesWrapper>
    <FeaturesHeadingText>Why use Playlist.io?</FeaturesHeadingText>
    <FeaturesIconsWrapper>
      <FeaturesIconWrapper>
        <Search color={colors.primary} size={ICON_SIZE} />
        <FeaturesSubheadingText>Search</FeaturesSubheadingText>
        <FeaturesDescriptionText>
          We leverage Spotify's extensive catalog so you can search for all your favorite artists.
        </FeaturesDescriptionText>
      </FeaturesIconWrapper>
      <FeaturesIconWrapper>
        <Headphones color={colors.primary} size={ICON_SIZE} />
        <FeaturesSubheadingText>Listen</FeaturesSubheadingText>
        <FeaturesDescriptionText>
          Jam out to your playlist with a fully-featured web music player. *Note: only for Spotify
          Premium subscribers.
        </FeaturesDescriptionText>
      </FeaturesIconWrapper>
      <FeaturesIconWrapper>
        <Download color={colors.primary} size={ICON_SIZE} />
        <FeaturesSubheadingText>Save</FeaturesSubheadingText>
        <FeaturesDescriptionText>
          Save your playlists to your Spotify account so you can listen on the go.
        </FeaturesDescriptionText>
      </FeaturesIconWrapper>
    </FeaturesIconsWrapper>
  </FeaturesWrapper>
);

const Footer_ = () => (
  <Footer>
    <CopyrightText>© Copyright 2018. All Rights Reserved.</CopyrightText>
    <SocialIcons>
      <StyledATag href="https://github.com/pxr13" target="_blank">
        <Github size={SOCIAL_ICON_SIZE} />
      </StyledATag>
      <StyledATag href="https://linkedin.com/in/patrickxrivera" target="_blank">
        <Linkedin size={SOCIAL_ICON_SIZE} />
      </StyledATag>
      <StyledATag href="https://twitter.com/pxr13" target="_blank">
        <Twitter size={SOCIAL_ICON_SIZE} />
      </StyledATag>
    </SocialIcons>
  </Footer>
);

LandingPage.propTypes = {
  handleAuth: func.isRequired
};

export default LandingPage;
