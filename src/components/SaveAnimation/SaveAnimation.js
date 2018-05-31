import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

import { Wrapper, SpotifyIcon, Text, dialogStyle } from './SaveAnimationStyles';

const SaveAnimation = ({ open, handleClose }) => (
  <Dialog modal={false} open={open} onRequestClose={handleClose} contentStyle={dialogStyle}>
    <Wrapper>
      <Text>Saved to </Text>
      <div>
        <SpotifyIcon color="#1db954" size={28} />
      </div>
    </Wrapper>
  </Dialog>
);

export default SaveAnimation;
