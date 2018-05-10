import { connect } from 'react-redux';

import NowPlaying from './NowPlaying';
import { getCurrentTracks } from '../../reducers/playlists';
import { getDeviceId } from '../../reducers/player';
import { getAccessToken } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  current: getCurrentTracks(state),
  accessToken: getAccessToken(state),
  deviceId: getDeviceId(state)
});

export default connect(mapStateToProps)(NowPlaying);
