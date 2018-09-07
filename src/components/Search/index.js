import React from 'react';
import { Search } from 'react-feather';

import Template from '../Template';
import { SIGN_IN_USER_ENDPOINT } from '../../utils/endpoints';
import { StyledLink } from '../LandingPage/LandingPageStyles';
import {
  ContentWrapper,
  Title,
  Subtext,
  SearchInputWrapper,
  SearchInput,
  DemoText
} from './styles';

const handleSignIn = () => {
  window.location = SIGN_IN_USER_ENDPOINT;
};

const SearchComponent = ({ handleInputChange, handleFormSubmit, query, isDemoUser }) => (
  <Template headingText="Search">
    <ContentWrapper>
      <Title style={{ marginTop: '4rem' }}>Enter an artist and receive</Title>
      <Title style={{ marginTop: '.2rem' }}>100 recommended songs related to that artist.</Title>
      <Subtext>Powered by the Spotify API</Subtext>
      <SearchInputWrapper>
        <Search style={{ opacity: '.4' }} />
        <form onSubmit={handleFormSubmit}>
          <SearchInput
            autoFocus
            placeholder="Try &quot;Drake&quot;"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </SearchInputWrapper>
      {isDemoUser && (
        <DemoText onClick={handleSignIn}>
          Note: You can only search for artists with Spotify Premium. Sign in{' '}
          <span style={{ textDecoration: 'underline' }}>here.</span>
        </DemoText>
      )}
    </ContentWrapper>
  </Template>
);

export default SearchComponent;
