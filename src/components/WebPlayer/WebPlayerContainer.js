import { connect } from 'react-redux';

import WebPlayer from './WebPlayer';
import { signOutUser } from '../../actions/auth';
import { setDeviceId, toggleIsPlaying, setIsActivated } from '../../actions/player';
import { getAccessToken, getIsPremium } from '../../reducers/auth';
import {
  getIsPlaying,
  getIsActivated,
  getCurrentTrack,
  getCurrentIdx
} from '../../reducers/player';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  isActivated: getIsActivated(state),
  isPlaying: getIsPlaying(state),
  currentTrack: getCurrentTrack(state),
  currentIdx: getCurrentIdx(state),
  isPremium: getIsPremium(state)
});

export default connect(mapStateToProps, {
  signOutUser,
  setDeviceId,
  toggleIsPlaying,
  setIsActivated
})(WebPlayer);
