import { connect } from 'react-redux';

import YourPlaylists from './YourPlaylists';
import { setCurrentPlaylist, fetchSavedPlaylists } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { getPlaylists } from '../../reducers/playlists';
import { getSpotifyId } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  playlists: getPlaylists(state),
  spotifyId: getSpotifyId(state)
});

export default connect(mapStateToProps, { setCurrentPlaylist, setPath, fetchSavedPlaylists })(
  YourPlaylists
);
