import React from 'react';
import { func, objectOf, shape, bool, string, object } from 'prop-types';

import * as Style from './NavStyles.js';
import MusicIcon from 'react-icons/lib/fa/music';
import Menu from './Menu/Menu';
import navOptions, { desktopMenuOption } from './data';

const SignedIn = (props) => (
  <Style.Wrapper>
    <Style.TabsWrapper>
      <Style.TitleWrapper onClick={() => props.handleNavOptionClick('/')}>
        <Style.Title style={Style.nameStyle}>Playlist.io</Style.Title>
        <MusicIcon size={22} />
      </Style.TitleWrapper>
      {Object.values(navOptions).map(renderNavOption(props.handleNavOptionClick))}
    </Style.TabsWrapper>
    <div>
      <Style.Settings>
        <Style.Name>{props.name}</Style.Name>
        <Style.HBDesktopMenuWrapper>
          <Menu
            color={'rgba(99, 111, 123, 0.8)'}
            handleSignOutClick={props.handleSignOutClick}
            menuOptions={desktopMenuOption}
          />
        </Style.HBDesktopMenuWrapper>
      </Style.Settings>
    </div>
    <Style.HBMobileMenuWrapper>
      <Menu
        color={'black'}
        handleSignOutClick={props.handleSignOutClick}
        menuOptions={navOptions}
      />
    </Style.HBMobileMenuWrapper>
  </Style.Wrapper>
);

const renderNavOption = (handleNavOptionClick) => ({ name, path, isSelected }) => (
  <Style.NavText
    key={`${name}-${path}`}
    onClick={() => handleNavOptionClick(path)}
    isSelected={isSelected}>
    {name}
  </Style.NavText>
);

SignedIn.propTypes = {
  handleNavOptionClick: func.isRequired,
  handleSignOutClick: func.isRequired,
  navOptions: objectOf(
    shape({
      name: string.isRequired,
      path: string.isRequired,
      isSelected: bool.isRequired,
      emoji: object
    })
  )
};

export default SignedIn;
