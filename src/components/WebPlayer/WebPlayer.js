import React, { Component } from 'react';
import Devices from 'react-icons/lib/md/devices';
import { forEach } from 'ramda';
import { Play, SkipForward, Volume1 } from 'react-feather';

import * as Style from './WebPlayerStyles';

const songUri = 'spotify:track:7iDa6hUg2VgEL1o1HjmfBn';

class WebPlayer extends Component {
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
    const eventNames = ['player_state_changed'];

    forEach(this.eventHandler, eventNames);

    this.player.on('ready', (data) => {
      const { setDeviceId } = this.props;
      const deviceId = data.device_id;
      console.log({ deviceId });
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

  render() {
    return (
      <Style.Wrapper>
        <Style.Placeholder>Placeholder Boobap</Style.Placeholder>
        <Style.Controls>
          <Volume1 size={18} style={Style.secondaryControl} />
          <Play size={30} style={Style.play} />
          <SkipForward size={18} style={Style.secondaryControl} />
        </Style.Controls>
        <Style.DeviceWrapper>
          <Style.DeviceText>Playlist.io Web Player</Style.DeviceText>
          <div>
            <Devices color="rgba(99, 111, 123, 0.8)" size={26} />
          </div>
        </Style.DeviceWrapper>
      </Style.Wrapper>
    );
  }
}

export default WebPlayer;
