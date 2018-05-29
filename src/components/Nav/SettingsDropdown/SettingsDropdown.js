import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import ContactMail from 'material-ui/svg-icons/communication/contact-mail';

import style from './SettingsDropdownStyles';

class SettingsDropdown extends React.Component {
  state = {
    isHovered: false
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    return (
      <IconMenu
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        iconStyle={this.state.isHovered ? style.isHovered : style.notHovered}
        iconButtonElement={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        anchorOrigin={style.origin}
        targetOrigin={style.origin}>
        <a href="mailto: patrick.x.rivera@gmail.com" style={style.link}>
          <MenuItem
            leftIcon={<ContactMail />}
            style={style.menuItem}
            primaryText="Send feedback"
            innerDivStyle={style.innerDiv}
          />
        </a>
        <MenuItem
          onClick={this.props.handleSignOutClick}
          leftIcon={<PowerSettingsNew />}
          style={style.menuItem}
          primaryText="Sign out"
          innerDivStyle={style.innerDiv}
        />
      </IconMenu>
    );
  }
}

export default SettingsDropdown;
