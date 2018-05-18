import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './Search';
import { initRefreshAccessToken } from '../../actions/auth';
import { fetchPlaylist } from '../../actions/search';
import { setPath } from '../../actions/nav';
import { getAccessToken, getRefreshToken } from '../../reducers/auth';
import { getSpotifyId } from '../../reducers/auth';
import { getSavedPlaylists } from '../../reducers/playlists';
import { fetchSavedPlaylists } from '../../actions/playlists';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  refreshToken: getRefreshToken(state),
  spotifyId: getSpotifyId(state),
  savedPlaylists: getSavedPlaylists(state)
});

export default reduxForm({
  form: 'search'
})(
  connect(mapStateToProps, { fetchPlaylist, fetchSavedPlaylists, setPath, initRefreshAccessToken })(
    withRouter(Search)
  )
);
