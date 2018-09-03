import React from 'react';
import { Search, Heart, Headphones } from 'react-feather';
import { SidePanelWrapper, Heading, MenuItem, MenuItemText } from './styles';

const ICON_SIZE = 16;

const SidePanel = () => (
  <SidePanelWrapper>
    <Heading>Menu</Heading>
    <div>
      <MenuItem isSelected>
        <Search size={ICON_SIZE} color={'#4992D8'} style={{ strokeWidth: '3' }} isSelected />
        <MenuItemText isSelected>Discover</MenuItemText>
      </MenuItem>
      <MenuItem>
        <Headphones size={ICON_SIZE} />
        <MenuItemText>Playlists</MenuItemText>
      </MenuItem>
      <MenuItem>
        <Heart size={ICON_SIZE} />
        <MenuItemText>Favorites</MenuItemText>
      </MenuItem>
    </div>
  </SidePanelWrapper>
);

export default SidePanel;
