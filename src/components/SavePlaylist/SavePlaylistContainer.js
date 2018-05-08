import { connect } from 'react-redux';

import SavePlaylist from './SavePlaylist';
import { savePlaylist } from '../../actions/playlists';
import { getSpotifyId } from '../../reducers/auth';
import { getCurrentTracks } from '../../reducers/playlists';

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  tracks: getCurrentTracks(state)
});

export default connect(mapStateToProps, { savePlaylist })(SavePlaylist);
