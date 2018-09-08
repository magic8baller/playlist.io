import React from 'react';
import { Volume1, Search, Heart, Headphones, LogOut, Star } from 'react-feather';
import {
  SidePanelWrapper,
  StyledLink,
  Heading,
  MenuItem,
  MenuItemText,
  activeStyle
} from './styles';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';

const ICON_SIZE = 20;

const SidePanel = ({ handleSignOutClick }) => (
  <SidePanelWrapper>
    <Heading>Menu</Heading>
    <div>
      <StyledLink to="/search" activeStyle={activeStyle}>
        <Search size={ICON_SIZE} style={{ strokeWidth: '2.5' }} />
        <MenuItemText>Search</MenuItemText>
      </StyledLink>

      <StyledLink to="/songs" activeStyle={activeStyle}>
        <Volume1 size={ICON_SIZE} />
        <MenuItemText>Songs</MenuItemText>
      </StyledLink>

      <StyledLink to="/playlists" activeStyle={activeStyle}>
        <Headphones size={ICON_SIZE} />
        <MenuItemText>Playlists</MenuItemText>
      </StyledLink>

      <StyledLink to="/favorites" activeStyle={activeStyle}>
        <Heart size={ICON_SIZE} />
        <MenuItemText>Favorites</MenuItemText>
      </StyledLink>
    </div>
    <Heading style={{ marginTop: '4rem' }}>Actions</Heading>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MenuItem>
        <SavePlaylistContainer>
          <Star size={ICON_SIZE} />
          <MenuItemText>Save to Spotify</MenuItemText>
        </SavePlaylistContainer>
      </MenuItem>
      <MenuItem style={{ marginTop: '1.25rem' }} onClick={handleSignOutClick}>
        <LogOut size={ICON_SIZE} />
        <MenuItemText>Log Out</MenuItemText>
      </MenuItem>
    </div>
  </SidePanelWrapper>
);

export default SidePanel;
