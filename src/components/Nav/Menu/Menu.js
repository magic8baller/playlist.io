import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import onClickOutside from 'react-onclickoutside';
import { map, values } from 'ramda';

import * as Style from './MenuStyles';

class Menu extends Component {
  state = {
    isOpen: false
  };

  handleMenuClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderMenuOption = ({ name, path, emoji }) => (
    <div key={name}>
      <Style.Link href={path}>
        <Style.MenuItem>
          <span role="img" aria-label={name}>
            {emoji}
          </span>{' '}
          <div>{name}</div>
        </Style.MenuItem>
      </Style.Link>
    </div>
  );

  renderMenuOptions = (menuOptions, handleSignOutClick) => (
    <Style.MenuBackground>
      <div>
        {map(this.renderMenuOption, values(menuOptions))}
        <Style.SignOut onClick={handleSignOutClick}>
          <span role="img" aria-label="Goodbye">
            👋
          </span>{' '}
          Sign Out
        </Style.SignOut>
      </div>
    </Style.MenuBackground>
  );

  render() {
    const { menuOptions, handleSignOutClick, color } = this.props;

    return (
      <div>
        <div />
        <Style.OuterWrapper>
          {this.state.isOpen && this.renderMenuOptions(menuOptions, handleSignOutClick)}
          <Style.MenuWrapper>
            <HamburgerMenu
              isOpen={this.state.isOpen}
              menuClicked={this.handleMenuClick}
              width={18}
              height={15}
              strokeWidth={2}
              rotate={0}
              color={this.state.isOpen ? 'black' : color}
              borderRadius={0}
              animationDuration={0.2}
            />
          </Style.MenuWrapper>
        </Style.OuterWrapper>
      </div>
    );
  }
}

export default Menu;
