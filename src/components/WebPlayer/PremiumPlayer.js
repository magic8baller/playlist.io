import React from 'react';
import Devices from 'react-icons/lib/md/devices';
import { func, objectOf, shape, bool, string, object } from 'prop-types';

import Icon from './icons';
import * as Style from './WebPlayerStyles';
import './styles.css';

const PremiumPlayer = ({ prevTrack, nextTrack, ...props }) => (
  <Style.Wrapper>
    {props.isActivated ? renderTrackInfoArea(props.currentTrack) : renderPlaceholder()}
    <Style.ControlsWrapper>
      <Style.Controls>
        {renderSecondaryControl(Icon.SkipBack, prevTrack, props)}
        {props.isActivated
          ? renderActivatedMainControl(props)
          : renderMainControl(Icon.Play, props)}
        {renderSecondaryControl(Icon.SkipForward, nextTrack, props)}
      </Style.Controls>
      <Style.ProgressBarArea isActivated={props.isActivated}>
        <div>{props.positionFormatted}</div>
        <Style.ProgressBarWrapper>
          <Style.ProgressBar progressPercentage={props.progressPercentage} />
        </Style.ProgressBarWrapper>
        <div>{props.durationFormatted}</div>
      </Style.ProgressBarArea>
    </Style.ControlsWrapper>
    <Style.DeviceWrapper>
      <Style.DeviceText>Playlist.io Web Player</Style.DeviceText>
      <div>
        <Devices style={Style.devices} size={26} />
      </div>
    </Style.DeviceWrapper>
  </Style.Wrapper>
);

const renderTrackInfoArea = ({ album: { artists, images }, name }) => (
  <Style.TrackWrapper>
    <img alt={name} src={images[2].url} />
    <Style.TrackInfoWrapper>
      <Style.TrackName>{name}</Style.TrackName>
      <Style.ArtistName>{artists[0].name}</Style.ArtistName>{' '}
    </Style.TrackInfoWrapper>
  </Style.TrackWrapper>
);

const renderPlaceholder = () => (
  <Style.TrackWrapper>
    <Style.Placeholder>Placeholder</Style.Placeholder>
  </Style.TrackWrapper>
);

const renderActivatedMainControl = ({ isPlaying, ...rest }) =>
  isPlaying ? renderMainControl(Icon.Pause, rest) : renderMainControl(Icon.Play, rest);

const renderSecondaryControl = (Control, handleClick, props) => (
  <Control
    className="hover-active"
    onMouseEnter={props.handleMouseEnter}
    onMouseLeave={props.handleMouseLeave}
    size={18}
    style={props.isActivated ? Style.secondaryControl : Style.notActivated}
    onClick={handleClick}
  />
);

const renderMainControl = (Control, props) => (
  <Control
    className={'hover-active ' + (!props.isReady && 'inactive')}
    onMouseEnter={props.handleMouseEnter}
    onMouseLeave={props.handleMouseLeave}
    onClick={props.handleMainControlClick}
    size={30}
    style={Style.play}
  />
);

PremiumPlayer.propTypes = {
  handleMouseEnter: func.isRequired,
  handleMouseLeave: func.isRequired,
  handleMainControlClick: func.isRequired,
  isActivated: bool.isRequired,
  currentTrack: objectOf(
    shape({
      artists: object.isRequired,
      isFavorited: bool,
      id: string.isRequired,
      album: object
    })
  )
};

export default PremiumPlayer;
