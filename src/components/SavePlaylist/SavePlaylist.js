import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Plus } from 'react-feather';
import Dialog from 'material-ui/Dialog';
import './styles.css';

import { savePlaylist } from '../../actions/playlists';
import { getSpotifyId } from '../../reducers/auth';
import { getCurrentTracks } from '../../reducers/playlists';
import * as Style from './SavePlaylistStyles.js';

class SavePlaylist extends Component {
  state = {
    open: false,
    title: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleKeyDown = (e) => {
    if (this.isEnterKey(e)) this.handleSubmit();
  };

  handleSubmit = () => {
    const { spotifyId, tracks, savePlaylist } = this.props;
    const { title } = this.state;

    const playlistData = { spotifyId, title, tracks };

    savePlaylist(playlistData);
    this.handleClose();
  };

  isEnterKey = ({ key }) => key === 'Enter';

  renderActions = () => (
    <ThemeProvider theme={Style.theme}>
      <div>
        <ThemeProvider theme={Style.invertTheme}>
          <Style.Btn onClick={this.handleSubmit}>Submit</Style.Btn>
        </ThemeProvider>
        <Style.Btn onClick={this.handleClose}>Cancel</Style.Btn>
      </div>
    </ThemeProvider>
  );

  render() {
    return (
      <Style.Wrapper onClick={this.handleOpen}>
        <Plus size={20} style={Style.icon} />
        <Style.Text>Save Playlist</Style.Text>
        <Dialog
          title="Save Playlist"
          actions={this.renderActions()}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={Style.customContentStyle}>
          <div>
            <Style.Title>Title</Style.Title>
            <Style.InputWrapper>
              <Style.Input
                onKeyDown={this.handleKeyDown}
                className="input__save-playlist"
                placeholder="Enter a playlist title"
                onChange={this.handleInputChange}
                autoFocus={true}
              />
            </Style.InputWrapper>
          </div>
        </Dialog>
      </Style.Wrapper>
    );
  }
}

export const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  tracks: getCurrentTracks(state)
});

export default connect(mapStateToProps, { savePlaylist })(SavePlaylist);
