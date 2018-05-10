import React, { Component } from 'react';

class WebPlayer extends Component {
  state = {
    deviceId: null
  };

  componentDidMount() {
    this.checkPlayerInterval = setInterval(() => this.checkPlayer(), 1000); // === 1 second
  }

  checkPlayer = () => {
    const { accessToken } = this.props;

    if (window.Spotify) {
      clearInterval(this.checkPlayerInterval);

      this.player = new window.Spotify.Player({
        name: 'Playlist.io Spotify Player',
        getOAuthToken: (cb) => {
          cb(accessToken);
        }
      });

      this.createEventHandlers();

      this.player.connect();
    }
  };

  createEventHandlers() {
    this.player.on('initialization_error', (e) => {
      console.error(e);
    });
    this.player.on('authentication_error', (e) => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', (e) => {
      console.error(e);
    });
    this.player.on('playback_error', (e) => {
      console.error(e);
    });

    this.player.on('player_state_changed', (state) => {
      console.log(state);
    });

    this.player.on('ready', (data) => {
      let { device_id } = data;
      console.log('Let the music play on!');
      console.log(device_id);
    });
  }

  render() {
    return <div>WebPlayer!</div>;
  }
}

export default WebPlayer;
