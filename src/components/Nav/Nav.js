import React, { Component } from 'react';
import MusicIcon from 'react-icons/lib/fa/music';
import forEach from 'lodash/forEach';
import { values, map, curry } from 'ramda';

import * as Style from './NavStyles.js';
import Menu from './Menu/Menu';
import navOptions, { desktopMenuOption } from './data';

class Nav extends Component {
  handleNavOptionClick = (path) => {
    const { setPath, history } = this.props;
    setPath(history, path);
  };

  handleSignOutClick = () => {
    const { history, setPath, signOutUser } = this.props;

    signOutUser();

    const newPath = '/';
    setPath(history, newPath);
  };

  setIsSelected = curry((path, navOption) => {
    navOption.isSelected = path === navOption.path;
  });

  toggleSettingsDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderNav = () => {
    const { auth, path } = this.props;

    // set selected path for styling
    forEach(navOptions, this.setIsSelected(path));

    return auth.isAuthenticated ? this.renderSignedIn(auth) : this.renderSignedOut();
  };

  renderSignedOut = () => (
    <Style.Wrapper>
      <Style.TitleWrapper>
        <Style.Title tyle={Style.nameStyle}>Playlist.io</Style.Title>
        <MusicIcon size={22} />
      </Style.TitleWrapper>
      <Style.NavText>Welcome!</Style.NavText>
    </Style.Wrapper>
  );

  renderSignedIn = ({ name }) => (
    <Style.Wrapper>
      <Style.TabsWrapper>
        <Style.TitleWrapper onClick={() => this.handleNavOptionClick('/')}>
          <Style.Title style={Style.nameStyle}>Playlist.io</Style.Title>
          <MusicIcon size={22} />
        </Style.TitleWrapper>
        {this.renderNavOptions(navOptions)}
      </Style.TabsWrapper>
      <div>
        <Style.Settings>
          <Style.Name>{name}</Style.Name>
          <Style.HBDesktopMenuWrapper>
            <Menu
              color={'rgba(99, 111, 123, 0.8)'}
              handleSignOutClick={this.handleSignOutClick}
              menuOptions={desktopMenuOption}
            />
          </Style.HBDesktopMenuWrapper>
        </Style.Settings>
      </div>
      <Style.HBMobileMenuWrapper>
        <Menu
          color={'black'}
          handleSignOutClick={this.handleSignOutClick}
          menuOptions={navOptions}
        />
      </Style.HBMobileMenuWrapper>
    </Style.Wrapper>
  );

  renderNavOptions = (navOptions) => map(this.renderNavOption, values(navOptions));

  renderNavOption = ({ name, path, isSelected }) => (
    <Style.NavText
      key={`${name}-${path}`}
      onClick={() => this.handleNavOptionClick(path)}
      isSelected={isSelected}>
      {name}
    </Style.NavText>
  );

  render() {
    return <div>{this.renderNav()}</div>;
  }
}

export default Nav;
