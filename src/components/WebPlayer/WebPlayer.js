import React, { Component } from 'react';

import { forEach } from 'ramda';

const songUri = 'spotify:track:7iDa6hUg2VgEL1o1HjmfBn';

class WebPlayer extends Component {
  componentDidMount() {
    this.checkPlayerInterval = setInterval(() => this.checkPlayer(), 1000); // === 1 second
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
    return <div>WebPlayer!</div>;
  }
}

export default WebPlayer;
