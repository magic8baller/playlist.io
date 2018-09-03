import React from 'react';
import { Download, Search, Heart, Headphones } from 'react-feather';
import {
  SidePanelWrapper,
  StyledLink,
  Heading,
  MenuItem,
  MenuItemText,
  activeStyle
} from './styles';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';
import colors from '../../utils/colors';

const ICON_SIZE = 16;

const SidePanel = () => (
  <SidePanelWrapper>
    <Heading>Menu</Heading>
    <div>
      <StyledLink to="/dashboard" activeStyle={activeStyle}>
        <Search size={ICON_SIZE} style={{ strokeWidth: '3' }} />
        <MenuItemText>Discover</MenuItemText>
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
