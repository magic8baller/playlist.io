import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicIcon from 'react-icons/lib/fa/music';
import AngleDown from 'react-icons/lib/fa/angle-down';
import { withRouter } from 'react-router-dom';
import { values, map, curry } from 'ramda';
import forEach from 'lodash/forEach';

import * as Style from './NavStyles.js';
import navOptions from './data';
import { setPath } from '../../actions/nav';
import { getAuth } from '../../reducers/auth';
import { getPath } from '../../reducers/nav';
import { signOutUser } from '../../actions/auth';

class Nav extends Component {
  handleNavOptionClick = (path) => {
    const { setPath, history } = this.props;
    setPath(history, path);
  };

  setIsSelected = curry((path, navOption) => {
    navOption.isSelected = path === navOption.path;
  });

  renderNav = () => {
    const { auth, path } = this.props;

    // set selected path for styling
    forEach(navOptions, this.setIsSelected(path));

    return auth.isAuthenticated ? this.renderSignedIn(auth) : this.renderSignedOut();
  };

  renderSignedOut = () => (
    <Style.Wrapper>
      <Style.TitleWrapper href="/">
        <Style.Title href="/" style={Style.nameStyle}>
          Playlist.io
        </Style.Title>
        <MusicIcon size={22} />
      </Style.TitleWrapper>
      <Style.NavText>Welcome!</Style.NavText>
    </Style.Wrapper>
  );

  renderSignedIn = ({ name }) => (
    <Style.Wrapper>
      <Style.TabsWrapper>
        <Style.TitleWrapper href="/">
          <Style.Title style={Style.nameStyle}>Playlist.io</Style.Title>
          <MusicIcon size={22} />
        </Style.TitleWrapper>
        {this.renderNavOptions(navOptions)}
      </Style.TabsWrapper>
      <div>
        <Style.Settings onClick={() => this.props.signOutUser()}>
          <div>{name}</div>
          <Style.AngleWrapper>
            <AngleDown size={18} />
          </Style.AngleWrapper>
        </Style.Settings>
      </div>
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

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  path: getPath(state)
});

export default connect(mapStateToProps, { signOutUser, setPath })(withRouter(Nav));
