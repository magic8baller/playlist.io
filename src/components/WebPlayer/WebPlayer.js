import React, { Component } from 'react';
import Devices from 'react-icons/lib/md/devices';
import { forEach } from 'ramda';

import Icon from './icons';
import * as Style from './WebPlayerStyles';
import './styles.css';

const songUri = 'spotify:track:7iDa6hUg2VgEL1o1HjmfBn';

const image = 'https://i.scdn.co/image/d0a9b0370891fe68f68467ea32cb60a35e346bf5';
const artistName = 'B';
const trackName = 'M';

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

  togglePlay = async () => {
    const { toggleIsPlaying } = this.props;

    await this.player.togglePlay();
    await toggleIsPlaying();
  };

  nextTrack = () => {
    const { currentIdx, playTrack } = this.props;
    const nextIdx = currentIdx + 1;

    playTrack(nextIdx);
  };

  setVolume = () => {
    console.log('Set volume');
  };

  renderTrackInfoArea = ({ album: { artists, images }, name }) => (
    <Style.TrackWrapper>
      <img src={images[2].url} />
      <Style.TrackInfoWrapper>
        <Style.TrackName>{name}</Style.TrackName>
        <Style.ArtistName>{artists[0].name}</Style.ArtistName>{' '}
      </Style.TrackInfoWrapper>
    </Style.TrackWrapper>
  );

  renderPlaceholder = () => (
    <Style.TrackWrapper>
      <Style.Placeholder>Placeholder</Style.Placeholder>
    </Style.TrackWrapper>
  );

  renderActivatedMainControl = () =>
    this.props.isPlaying ? this.renderMainControl(Icon.Pause) : this.renderMainControl(Icon.Play);

  renderSecondaryControl = (Control, handleClick) => (
    <Control
      className="web-player-control__hovered"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      size={18}
      style={Style.secondaryControl}
      onClick={handleClick}
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
    const { isPlaying, isHovered, isActivated, currentTrack } = this.props;

    return (
      <Style.Wrapper>
        {isActivated ? this.renderTrackInfoArea(currentTrack) : this.renderPlaceholder()}
        <Style.Controls>
          {this.renderSecondaryControl(Icon.Volume, this.setVolume)}
          {isActivated ? this.renderActivatedMainControl() : this.renderMainControl(Icon.Play)}
          {this.renderSecondaryControl(Icon.SkipForward, this.nextTrack)}
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
