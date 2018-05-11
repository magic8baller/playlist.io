import { connect } from 'react-redux';

import NowPlaying from './NowPlaying';
import { setIsPlaying, setIsActivated, setCurrentTrack, setCurrentIdx } from '../../actions/player';
import { getCurrentTracks } from '../../reducers/playlists';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  currentPlaylist: getCurrentTracks(state),
  accessToken: getAccessToken(state),
  deviceId: getDeviceId(state)
});

export default connect(mapStateToProps, {
  setIsPlaying,
  setIsActivated,
  setCurrentTrack,
  setCurrentIdx
})(NowPlaying);
