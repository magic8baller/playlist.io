import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Plus } from 'react-feather';
import Dialog from 'material-ui/Dialog';
import './styles.css';

import * as Style from './SavePlaylistStyles.js';

const SavePlaylist = (props) => (
  <Style.Wrapper onClick={props.handleOpen}>
    <Plus size={20} style={Style.icon} />
    <Style.Text>Save to Spotify</Style.Text>
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
