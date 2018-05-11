import { connect } from 'react-redux';

import WebPlayer from './WebPlayer';
import { signOutUser } from '../../actions/auth';
import { setDeviceId, toggleIsPlaying, setIsActivated } from '../../actions/player';
import { getAccessToken } from '../../reducers/auth';
import { getIsPlaying, getIsActivated } from '../../reducers/player';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  isActivated: getIsActivated(state),
  isPlaying: getIsPlaying(state)
});

export default connect(mapStateToProps, {
  signOutUser,
  setDeviceId,
  toggleIsPlaying,
  setIsActivated
})(WebPlayer);
