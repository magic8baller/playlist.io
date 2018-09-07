import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dialog from 'material-ui/Dialog';
import './styles.css';

import { SIGN_IN_USER_ENDPOINT } from '../../utils/endpoints';
import * as Style from './SavePlaylistStyles.js';

const SavePlaylist = (props) => (
  <Style.Wrapper onClick={props.handleOpen}>
    {props.children}
    <Dialog
      title="Save Playlist"
      actions={renderActions(props)}
      modal={false}
      open={props.open}
      onRequestClose={props.handleClose}
      contentStyle={Style.customContentStyle}>
      <div>
        <Style.Title>Title</Style.Title>
        <Style.InputWrapper>
          <Style.Input
            onKeyDown={props.handleKeyDown}
            className="input__save-playlist"
            placeholder="Enter a playlist title"
            onChange={props.handleInputChange}
            autoFocus={true}
          />
        </Style.InputWrapper>
        {props.isDemoUser && (
          <Style.DemoText
            onClick={() => {
              window.location = SIGN_IN_USER_ENDPOINT;
            }}>
            Note: You can only save playlists to Spotify with Spotify Premium. Sign in here.
          </Style.DemoText>
        )}
      </div>
    </Dialog>
  </Style.Wrapper>
);

const renderActions = ({ handleSubmit, handleClose }) => (
  <ThemeProvider theme={Style.theme}>
    <div>
      <ThemeProvider theme={Style.invertTheme}>
        <Style.Btn onClick={handleSubmit}>Submit</Style.Btn>
      </ThemeProvider>
      <Style.Btn onClick={handleClose}>Cancel</Style.Btn>
    </div>
  </ThemeProvider>
);

export default SavePlaylist;
