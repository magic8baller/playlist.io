import React from 'react';
import { Search } from 'react-feather';

import Template from '../Template';
import { ContentWrapper, Title, Subtext, SearchInputWrapper, SearchInput } from './styles';

const SearchComponent = ({ handleInputChange, handleFormSubmit, query }) => (
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
    </ContentWrapper>
  </Template>
);

export default SearchComponent;
