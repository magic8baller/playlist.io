import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { map, values } from 'ramda';

import * as Style from './MobileMenuStyles';

class MobileMenu extends Component {
  state = {
    menuIsOpen: false
  };

  handleMenuClick = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  };

  renderMenuOption = ({ name, path, emoji }) => (
    <div key={name}>
      <Style.MenuItem>
        <span role="img" aria-label={name}>
          {emoji}
        </span>{' '}
        <div>{name}</div>
      </Style.MenuItem>
    </div>
  );

  renderMenuOptions = (menuOptions) => (
    <Style.Wrapper>
      <div>
        {map(this.renderMenuOption, values(menuOptions))}
        <Style.SignOut>
          <span role="img" aria-label="Goodbye">
            👋
          </span>{' '}
          Sign Out
        </Style.SignOut>
      </div>
    </Style.Wrapper>
  );

  render() {
    return (
      <div>
        <div />
        <Style.OuterWrapper>
          {this.state.menuIsOpen && this.renderMenuOptions(this.props.menuOptions)}
          <Style.MenuWrapper>
            <HamburgerMenu
              isOpen={this.state.menuIsOpen}
              menuClicked={this.handleMenuClick}
              width={18}
              height={15}
              strokeWidth={2}
              rotate={0}
              color="black"
              borderRadius={0}
              animationDuration={0.2}
            />
          </Style.MenuWrapper>
        </Style.OuterWrapper>
      </div>
    );
  }
}

export default MobileMenu;
