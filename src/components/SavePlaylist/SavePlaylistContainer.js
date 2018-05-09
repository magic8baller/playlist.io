import { connect } from 'react-redux';

import SavePlaylist from './SavePlaylist';
import { savePlaylist } from '../../actions/playlists';
import { getSpotifyId, getAccessToken } from '../../reducers/auth';
import { getCurrentTracks } from '../../reducers/playlists';

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  tracks: getCurrentTracks(state),
  accessToken: getAccessToken(state)
});

export default connect(mapStateToProps, { savePlaylist })(SavePlaylist);
