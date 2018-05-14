import { connect } from 'react-redux';

import YourPlaylists from './YourPlaylists';
import { setCurrentPlaylist, fetchSavedPlaylists } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { getSavedPlaylists } from '../../reducers/playlists';
import { getSpotifyId } from '../../reducers/auth';
import { getNoPlaylistsError } from '../../reducers/errors';

const mapStateToProps = (state) => ({
  savedPlaylists: getSavedPlaylists(state),
  spotifyId: getSpotifyId(state),
  noPlaylistsError: getNoPlaylistsError(state)
});

export default connect(mapStateToProps, { setCurrentPlaylist, setPath, fetchSavedPlaylists })(
  YourPlaylists
);
