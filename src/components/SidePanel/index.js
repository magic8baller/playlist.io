import React from 'react';
import { Download, Search, Heart, Headphones } from 'react-feather';
import { SidePanelWrapper, StyledLink, Heading, MenuItem, MenuItemText } from './styles';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';

const ICON_SIZE = 16;

const SidePanel = () => (
  <SidePanelWrapper>
    <Heading>Menu</Heading>
    <div>
      <StyledLink to="/dashboard">
        <MenuItem isSelected>
          <Search size={ICON_SIZE} color={'#4992D8'} style={{ strokeWidth: '3' }} isSelected />
          <MenuItemText isSelected>Discover</MenuItemText>
        </MenuItem>
      </StyledLink>
      <StyledLink to="/playlists">
        <MenuItem>
          <Headphones size={ICON_SIZE} />
          <MenuItemText>Playlists</MenuItemText>
        </MenuItem>
      </StyledLink>
      <MenuItem>
        <Heart size={ICON_SIZE} />
        <MenuItemText>Favorites</MenuItemText>
      </MenuItem>
    </div>
    <Heading style={{ marginTop: '4rem' }}>Actions</Heading>
    <div>
      <SavePlaylistContainer>
        <MenuItem>
          <Download size={ICON_SIZE} />
          <MenuItemText>Save to Spotify</MenuItemText>
        </MenuItem>
      </SavePlaylistContainer>
    </div>
  </SidePanelWrapper>
);

export default SidePanel;
