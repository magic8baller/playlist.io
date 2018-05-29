import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './Search';
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

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  refreshToken: getRefreshToken(state),
  spotifyId: getSpotifyId(state),
  savedPlaylists: getSavedPlaylists(state),
  cache: getCache(state),
  isInitialRender: getIsInitialRender(state)
});

export default reduxForm({
  form: 'search'
})(
  connect(mapStateToProps, {
    fetchPlaylist,
    fetchAllPlaylists,
    fetchAllFavorites,
    setIsInitialRender,
    setCurrentQuery,
    setPath,
    refreshAccessToken,
    returnCachedPlaylist
  })(withRouter(Search))
);
