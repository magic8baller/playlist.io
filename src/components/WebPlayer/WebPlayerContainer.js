import React, { Component } from 'react';
import moment from 'moment';
import { forEach } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, objectOf, shape, bool, string, object, number } from 'prop-types';

import PremiumPlayer from './PremiumPlayer';
import NonPremiumPlayer from './NonPremiumPlayer';
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

class WebPlayerContainer extends Component {
  static propTypes = {
    signOutUser: func.isRequired,
    setDeviceId: func.isRequired,
    toggleIsPlaying: func.isRequired,
    setIsActivated: func.isRequired,
    setPath: func.isRequired,
    playTrack: func.isRequired,
    isActivated: bool.isRequired,
    isPlaying: bool.isRequired,
    isPremiumUser: bool.isRequired,
    accessToken: string.isRequired,
    currentIdx: number,
    currentTrack: objectOf(
      shape({
        artists: object.isRequired,
        isFavorited: bool,
        id: string.isRequired,
        album: object
      })
    )
  };

  state = {
    isHovered: false,
    isReady: false,
    timerIsActivated: false,
    positionInMs: null,
    positionFormatted: null,
    durationInMs: null,
    durationFormated: null,
    progressPercentage: 0
  };

  componentDidMount() {
    this.checkPlayerInterval = setInterval(this.checkPlayer, 100); // === 0.1 seconds
  }

  componentWillUnmount() {
    clearInterval(this.trackPositionInterval);
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  setCurrentTrackDuration = async () => {
    const [durationInMs, durationFormatted] = await this.getTrack('duration');

    this.setState({
      durationInMs,
      durationFormatted,
      timerIsActivated: true
    });
  };

  trackPosition = async () => {
    const [positionInMs, positionFormatted] = await this.getTrack('position');

    const progressPercentage = positionInMs / this.state.durationInMs * 100;

    this.setState({
      positionInMs,
      positionFormatted,
      progressPercentage: `${progressPercentage}%`
    });
  };

  getTrack = async (time) => {
    const currentState = await this.player.getCurrentState();
    const timeInMs = currentState[time];
    const timeFormatted = moment.utc(timeInMs).format('m:ss');

    return [timeInMs, timeFormatted];
  };

  checkPlayer = () => {
    if (window.Spotify) {
      clearInterval(this.checkPlayerInterval);
      this.initPlayer();
      this.createEventHandlers();
      this.createErrorHandlers();
    }
  };

  initPlayer = () => {
    const { accessToken } = this.props;

    this.player = new window.Spotify.Player({
      name: 'Playlist.io',
      getOAuthToken: (cb) => {
        cb(accessToken);
      }
    });

    this.player.connect();
  };

  createEventHandlers = () => {
    this.player.on('player_state_changed', (data) => {
      const { currentTrack } = this.props;
      const { prevTrack } = this.state;

      if (currentTrack === prevTrack) return;

      this.setCurrentTrackDuration();
      this.trackPositionInterval = setInterval(this.trackPosition, 500); // === 0.5 seconds
    });

    this.player.on('ready', (data) => {
      const { setDeviceId } = this.props;
      const deviceId = data.device_id;

      setDeviceId(deviceId);
      this.setState({ isReady: true });
    });
  };

  createErrorHandlers = () => {
    const { signOutUser, history, setPath } = this.props;
    const errorNames = ['initialization_error', 'account_error', 'playback_error'];

    forEach(this.errorHandler, errorNames);

    this.player.on('authentication_error', (e) => {
      console.error(e);
      signOutUser();
      setPath(history, '/');
    });
  };

  errorHandler = (errorName) => {
    this.player.on(errorName, (e) => {
      console.error(e);
    });
  };

  handleMainControlClick = () =>
    this.props.isActivated ? this.togglePlay() : this.props.playTrack();

  togglePlay = async () => {
    const { toggleIsPlaying } = this.props;

    await this.player.togglePlay();
    await toggleIsPlaying();
  };

  nextTrack = () => this.handleTrackChange(1);

  prevTrack = () => this.handleTrackChange(-1);

  handleTrackChange = (change) => {
    const { currentIdx, playTrack } = this.props;
    const nextIdx = currentIdx + change;

    playTrack(nextIdx);
  };

  render() {
    return this.props.isPremiumUser ? (
      <PremiumPlayer {...this.prevTrack} {...this} {...this.props} {...this.state} />
    ) : (
      <NonPremiumPlayer />
    );
  }
}

const mapStateToProps = (state, { playTrack }) => ({
  accessToken: getAccessToken(state),
  isActivated: getIsActivated(state),
  isPlaying: getIsPlaying(state),
  currentTrack: getCurrentTrack(state),
  currentIdx: getCurrentIdx(state),
  isPremiumUser: getIsPremium(state),
  playTrack
});

export default connect(mapStateToProps, {
  signOutUser,
  setDeviceId,
  toggleIsPlaying,
  setIsActivated,
  setPath
})(withRouter(WebPlayerContainer));
