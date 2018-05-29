import { connect } from 'react-redux';

import YourPlaylists from './YourPlaylists';
import { setCurrentPlaylist } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { getSavedPlaylists } from '../../reducers/playlists';
import { getSpotifyId } from '../../reducers/auth';
import { getNoSavedPlaylistsError } from '../../reducers/errors';

const mapStateToProps = (state) => ({
  savedPlaylists: getSavedPlaylists(state),
  spotifyId: getSpotifyId(state),
  noSavedPlaylistsError: getNoSavedPlaylistsError(state)
});

export default connect(mapStateToProps, { setCurrentPlaylist, setPath })(YourPlaylists);
