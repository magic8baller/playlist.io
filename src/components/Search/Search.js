import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func, bool, string } from 'prop-types';

import * as Style from './SearchStyles';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (isLoaded) => (isLoaded ? '' : 'wrapper__hide');

const Search = (props) => {
  return (
    <div>
      <Style.Wrapper className={getClassName(props.isLoaded)}>
        <BackgroundImg onLoad={props.handleLoadedImg} src={require('./search.jpg')} />
        <Style.InnerWrapper>
          <Style.Title>
            Enter a keyword and our robots will search Spotify playlists for popular songs related
            to that word.
          </Style.Title>
          <form onSubmit={props.handleFormSubmit}>
            <Field
              name="query"
              type="text"
              component={() => renderSearchField(props)}
              placeholder="Enter a keyword..."
            />
          </form>
        </Style.InnerWrapper>
      </Style.Wrapper>
      {!props.isLoaded && (
        <HomePlaceholderWrapper>
          <HomeBackgroundPlaceholder />
        </HomePlaceholderWrapper>
      )}
    </div>
  );
};

const renderSearchField = ({ handleInputChange, query }) => (
  <Style.Form>
    <Style.SearchIcon />
    <Style.Input
      autoFocus
      value={query}
      onChange={handleInputChange}
      placeholder={'Ex: "programming", "workout", etc.'}
    />
    <Style.Btn type="submit">
      <Style.BtnText>Search</Style.BtnText>
    </Style.Btn>
  </Style.Form>
);

Search.propTypes = {
  isLoaded: bool.isRequired,
  handleLoadedImg: func.isRequired,
  handleFormSubmit: func.isRequired,
  handleInputChange: func.isRequired,
  query: string.isRequired
};

export default reduxForm({
  form: 'search'
})(Search);
