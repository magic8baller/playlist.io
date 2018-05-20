import React, { Component } from 'react';
import { Field } from 'redux-form';
import { isEmpty } from 'ramda';

import * as Style from './SearchStyles';
import media from '../../utils/mediaTemplate';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (isLoaded) => (isLoaded ? '' : 'wrapper__hide');

const isCached = (cache, query) => cache[query];

class Search extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    this.handleRefreshAccessToken();
    this.handleSetCurrPath();
    this.maybeFetchSavedPlaylists(() => {
      this.maybeSetInitialRender();
    });
  }

  handleRefreshAccessToken = async () => {
    const { refreshToken, refreshAccessToken } = this.props;
    // TODO: come up with better names to differentiate these two
    refreshAccessToken(refreshToken);
  };

  handleSetCurrPath = () => {
    const { setPath, history } = this.props;
    const currPath = '/';

    setPath(history, currPath);
  };

  maybeSetInitialRender = () => {
    const { isInitialRender, setIsInitialRender } = this.props;

    isInitialRender && setIsInitialRender();
  };

  maybeFetchSavedPlaylists = (cb) => {
    const { savedPlaylists, spotifyId, fetchSavedPlaylists, isInitialRender } = this.props;

    isInitialRender && fetchSavedPlaylists(spotifyId);
    cb();
  };

  handleFormSubmit = ({ query }) => {
    const { cache, setCurrentQuery } = this.props;
    const normalizedQuery = query.toLowerCase();

    setCurrentQuery(normalizedQuery);

    isCached(cache, normalizedQuery)
      ? this.handleCachedQuery(query, cache)
      : this.handleNonCachedQuery(query);

    this.setNextPath();
  };

  handleCachedQuery = (query, cache) => {
    const { returnCachedPlaylist } = this.props;
    const playlist = cache[query];

    returnCachedPlaylist(playlist);
  };

  handleNonCachedQuery = (query) => {
    const { fetchPlaylist, spotifyId, accessToken } = this.props;

    fetchPlaylist(spotifyId, accessToken, query);
  };

  setNextPath = () => {
    const { history, setPath } = this.props;
    const nextPath = '/playing';

    setPath(history, nextPath);
  };

  handleLoadedImg = () => {
    this.setState({ isLoaded: true });
  };

  renderSearchField = ({ input }) => (
    <Style.Form {...input}>
      <Style.SearchIcon />
      <Style.Input autoFocus placeholder={'Ex: "programming", "workout", etc.'} />
      <Style.Btn type="submit">
        <Style.BtnText>Search</Style.BtnText>
      </Style.Btn>
    </Style.Form>
  );

  render() {
    const { handleSubmit } = this.props;
    const { isLoaded } = this.state;

    return (
      <div>
        <Style.Wrapper className={getClassName(isLoaded)}>
          <BackgroundImg onLoad={this.handleLoadedImg} src={require('./search.jpg')} />
          <Style.InnerWrapper>
            <Style.Title>
              Enter a keyword and our robots will search Spotify playlists for popular songs related
              to that word.
            </Style.Title>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="query"
                type="text"
                component={this.renderSearchField}
                placeholder="Enter a keyword..."
              />
            </form>
          </Style.InnerWrapper>
        </Style.Wrapper>
        {!isLoaded && (
          <HomePlaceholderWrapper>
            <HomeBackgroundPlaceholder />
          </HomePlaceholderWrapper>
        )}
      </div>
    );
  }
}

export default Search;
