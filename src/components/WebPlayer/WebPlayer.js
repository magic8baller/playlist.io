import React, { Component } from 'react';
import Devices from 'react-icons/lib/md/devices';
import { forEach } from 'ramda';

import Icon from './icons';
import * as Style from './WebPlayerStyles';
import './styles.css';

const songUri = 'spotify:track:7iDa6hUg2VgEL1o1HjmfBn';

class WebPlayer extends Component {
  state = {
    isHovered: false
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  componentDidMount() {
    this.checkPlayerInterval = setInterval(() => this.checkPlayer(), 100); // === 0.1 seconds
  }

  checkPlayer = () => {
    const { accessToken } = this.props;

    if (window.Spotify) {
      clearInterval(this.checkPlayerInterval);

      this.player = new window.Spotify.Player({
        name: 'Playlist.io',
        getOAuthToken: (cb) => {
          cb(accessToken);
        }
      });

      this.createEventHandlers();
      this.createErrorHandlers();

      this.player.connect();
    }
  };

  createEventHandlers = () => {
    this.player.on('player_state_changed', (data) => {
      console.log(data);
    });

    this.player.on('ready', (data) => {
      const { setDeviceId } = this.props;
      const deviceId = data.device_id;

      setDeviceId(deviceId);
    });
  };

  createErrorHandlers = () => {
    const { signOutUser } = this.props;
    const errorNames = ['initialization_error', 'account_error', 'playback_error'];

    forEach(this.errorHandler, errorNames);

    this.player.on('authentication_error', (e) => {
      console.error(e);
      signOutUser();
    });
  };

  errorHandler = (errorName) => {
    this.player.on(errorName, (e) => {
      console.error(e);
    });
  };

  eventHandler = (eventName) => {
    this.player.on(eventName, (e) => {
      console.log(e);
    });
  };

  togglePlay = async () => {
    const { toggleIsPlaying } = this.props;

    await this.player.togglePlay();
    await toggleIsPlaying();
  };

  renderSecondaryControl = (Control) => (
    <Control
      className="web-player-control__hovered"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      size={18}
      style={Style.secondaryControl}
    />
  );

  renderMainControl = (Control) => (
    <Control
      className="web-player-control__hovered"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onClick={this.togglePlay}
      size={30}
      style={Style.play}
    />
  );

  render() {
    const { isPlaying, isHovered } = this.props;

    return (
      <Style.Wrapper>
        <Style.Placeholder>Placeholder Boobap</Style.Placeholder>
        <Style.Controls>
          {this.renderSecondaryControl(Icon.Volume)}
          {isPlaying ? this.renderMainControl(Icon.Play) : this.renderMainControl(Icon.Pause)}
          {this.renderSecondaryControl(Icon.SkipForward)}
        </Style.Controls>
        <Style.DeviceWrapper>
          <Style.DeviceText>Playlist.io Web Player</Style.DeviceText>
          <div>
            <Devices style={Style.devices} size={26} />
          </div>
        </Style.DeviceWrapper>
      </Style.Wrapper>
    );
  }
}

export default WebPlayer;
