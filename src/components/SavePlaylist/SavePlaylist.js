import React, { Component } from 'react';
import { Plus } from 'react-feather';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './styles.css';

import * as Style from './SavePlaylistStyles.js';

class SavePlaylist extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
    ];

    return (
      <Style.Wrapper onClick={this.handleOpen}>
        <Plus size={20} style={Style.icon} />
        <Style.Text>Save Playlist</Style.Text>
        <Dialog
          title="Save Playlist"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={Style.customContentStyle}>
          <div>
            <Style.Title>Title</Style.Title>
            <Style.InputWrapper>
              <Style.Input className="input__save-playlist" placeholder="Enter a playlist title" />
            </Style.InputWrapper>
          </div>
        </Dialog>
      </Style.Wrapper>
    );
  }
}

export default SavePlaylist;
