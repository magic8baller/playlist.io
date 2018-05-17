import { connect } from 'react-redux';

import NowPlaying from './NowPlaying';
import { setIsPlaying, setIsActivated, setCurrentTrack, setCurrentIdx } from '../../actions/player';
import { getCurrentTracks } from '../../reducers/playlists';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';
import { getSearchError } from '../../reducers/errors';

const mapStateToProps = (state, { playTrack }) => ({
  currentPlaylist: getCurrentTracks(state),
  accessToken: getAccessToken(state),
  deviceId: getDeviceId(state),
  searchError: getSearchError(state),
  playTrack
});

export default connect(mapStateToProps, {
  setIsPlaying,
  setIsActivated,
  setCurrentTrack,
  setCurrentIdx
})(NowPlaying);
