import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';

import * as Style from './MobileMenuStyles';

class MobileMenu extends Component {
  state = {
    menuIsOpen: false
  };

  handleMenuClick = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  };

  render() {
    return (
      <div>
        <div />
        <Style.OuterWrapper>
          {this.state.menuIsOpen && (
            <Style.Wrapper>
              <div>
                <div>
                  <Style.MenuItem>
                    <span role="img" aria-label="Fire">
                      🔥
                    </span>{' '}
                    <div>Your Playlists</div>
                  </Style.MenuItem>
                </div>
                <Style.MenuItem>
                  <span role="img" aria-label="Fire">
                    🔥
                  </span>{' '}
                  <div>Your Playlists</div>
                </Style.MenuItem>
                <Style.MenuItem>
                  <span role="img" aria-label="Fire">
                    🔥
                  </span>{' '}
                  <div>Your Playlists</div>
                </Style.MenuItem>
                <Style.MenuItem>
                  <span role="img" aria-label="Fire">
                    🔥
                  </span>{' '}
                  <div>Your Playlists</div>
                </Style.MenuItem>
              </div>
              <Style.SignOut>Sign Out</Style.SignOut>
            </Style.Wrapper>
          )}
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
