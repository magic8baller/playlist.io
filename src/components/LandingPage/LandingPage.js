import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Github, Twitter, Linkedin, Download, Search, Headphones } from 'react-feather';
import colors from '../../utils/colors';

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

const LandingPage = ({ handleAuth, handleDemoClick }) => (
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
      <Button onClick={handleAuth}>Start</Button>
      <SecondaryButton onClick={handleDemoClick}>Demo</SecondaryButton>
    </Body>
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
  </Wrapper>
);

LandingPage.propTypes = {
  handleAuth: func.isRequired
};

export default LandingPage;
