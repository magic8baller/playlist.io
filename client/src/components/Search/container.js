import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { any, curry, find, propEq, pipe } from 'ramda';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import Search from '../Search';
import { refreshAccessToken } from '../../actions/auth';
import { fetchPlaylist, returnCachedPlaylist, setCurrentQuery } from '../../actions/search';
import { setPath } from '../../actions/nav';
import { getAccessToken, getRefreshToken } from '../../reducers/auth';
import { getSpotifyId } from '../../reducers/auth';
import { getSavedPlaylists, getCache } from '../../reducers/playlists';
import { fetchAllPlaylists } from '../../actions/playlists';
import { getIsInitialRender } from '../../reducers/events';
import { setIsInitialRender } from '../../actions/events';
import { fetchAllFavorites } from '../../actions/favorites';

const isCurrentQuery = curry(
  (currentQuery, cachedPlaylist) => currentQuery === cachedPlaylist.query
);

const isCached = (cache, currentQuery) => any(isCurrentQuery(currentQuery), cache);

const getPlaylist = (entry) => entry.tracks;

const getEntry = curry((query, cache) => find(propEq('query', query), cache));

const getCachedPlaylist = (query, cache) => pipe(getEntry(query), getPlaylist)(cache);

class SearchContainer extends Component {
  static propTypes = {
    accessToken: string.isRequired,
    refreshToken: string.isRequired,
    spotifyId: string.isRequired,
    savedPlaylists: arrayOf(
      shape({
        artists: array,
        isFavorited: bool,
        id: string,
        album: object
      })
    ),
    cache: arrayOf(
      shape({
        artists: array,
        isFavorited: bool,
        id: string,
        album: object
      })
    ),
    isInitialRender: bool.isRequired,
    fetchPlaylist: func.isRequired,
    fetchAllPlaylists: func.isRequired,
    fetchAllFavorites: func.isRequired,
    setIsInitialRender: func.isRequired,
    setCurrentQuery: func.isRequired,
    setPath: func.isRequired,
    refreshAccessToken: func.isRequired,
    returnCachedPlaylist: func.isRequired
  };

  state = {
    query: '',
    mainDropdown: {
      text: 'By Artist',
      type: 'artist'
    }
  };

  componentDidMount() {
    this.maybeFetchDbData(() => {
      this.props.setIsInitialRender();
    });
  }

  maybeFetchDbData = (cb) => {
    const { spotifyId, fetchAllPlaylists, isInitialRender, fetchAllFavorites } = this.props;

    if (!isInitialRender) return;

    fetchAllPlaylists(spotifyId);
    fetchAllFavorites(spotifyId);
    cb();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { query, mainDropdown } = this.state;
    const { cache, setCurrentQuery, history } = this.props;

    if (!query) return; // if empty, just return

    const normalizedQuery = query.toLowerCase();

    setCurrentQuery(normalizedQuery);

    isCached(cache, normalizedQuery)
      ? this.handleCachedQuery(normalizedQuery, cache)
      : this.handleNonCachedQuery(normalizedQuery, mainDropdown);

    history.push('/songs');
  };

  handleCachedQuery = (query, cache) => {
    const { returnCachedPlaylist } = this.props;

    const playlist = getCachedPlaylist(query, cache);

    returnCachedPlaylist(playlist);
  };

  handleNonCachedQuery = (query, mainDropdown) => {
    const { fetchPlaylist, spotifyId, accessToken } = this.props;

    fetchPlaylist(spotifyId, accessToken, query, mainDropdown);
  };
  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return <Search {...this} {...this.props} {...this.state} />;
  }
}

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  refreshToken: getRefreshToken(state),
  spotifyId: getSpotifyId(state),
  savedPlaylists: getSavedPlaylists(state),
  cache: getCache(state),
  isInitialRender: getIsInitialRender(state),
  isDemoUser: state.auth.isDemoUser
});

export default connect(mapStateToProps, {
  fetchPlaylist,
  fetchAllPlaylists,
  fetchAllFavorites,
  setIsInitialRender,
  setCurrentQuery,
  refreshAccessToken,
  returnCachedPlaylist
})(withRouter(SearchContainer));
