import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import WebPlayer from './WebPlayer';
import { signOutUser } from '../../actions/auth';
import { setDeviceId, toggleIsPlaying, setIsActivated } from '../../actions/player';
import { setPath } from '../../actions/nav';
import { getAccessToken, getIsPremium } from '../../reducers/auth';
import {
  getIsPlaying,
  getIsActivated,
  getCurrentTrack,
  getCurrentIdx
} from '../../reducers/player';

const mapStateToProps = (state, { playTrack }) => ({
  accessToken: getAccessToken(state),
  isActivated: getIsActivated(state),
  isPlaying: getIsPlaying(state),
  currentTrack: getCurrentTrack(state),
  currentIdx: getCurrentIdx(state),
  isPremium: getIsPremium(state),
  playTrack
});

export default connect(mapStateToProps, {
  signOutUser,
  setDeviceId,
  toggleIsPlaying,
  setIsActivated,
  setPath
})(withRouter(WebPlayer));
