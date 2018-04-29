import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicIcon from 'react-icons/lib/fa/music';
import AngleDown from 'react-icons/lib/fa/angle-down';
import { withRouter } from 'react-router-dom';
import { values, map, pipe } from 'ramda';

import navOptions from './data';
import * as Style from './NavStyles.js';
import { signOutUser } from '../../actions/auth';

class Nav extends Component {
  renderNav = () => {
    const { auth, location: { pathname } } = this.props;
    navOptions[pathname].isSelected = true; // set selected path for styling

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

  renderNavOptions = (navOptions) => pipe(values, this.mapNavOptions)(navOptions);

  mapNavOptions = (navOptions) => map(this.renderNavOption, navOptions);

  renderNavOption = ({ name, path, isSelected }) => (
    <Style.NavText key={`${name}-${path}`} href={path} isSelected={isSelected}>
      {name}
    </Style.NavText>
  );

  render() {
    return <div>{this.renderNav()}</div>;
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { signOutUser })(withRouter(Nav));
