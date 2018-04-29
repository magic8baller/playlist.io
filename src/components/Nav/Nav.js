import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicIcon from 'react-icons/lib/fa/music';
import AngleDown from 'react-icons/lib/fa/angle-down';
import { withRouter } from 'react-router-dom';
import { values, map, pipe } from 'ramda';

import navOptions from './data';
import {
  Wrapper,
  TabsWrapper,
  Title,
  TitleWrapper,
  NavText,
  nameStyle,
  Settings,
  AngleWrapper
} from './NavStyles.js';
import { signOutUser } from '../../actions/auth';

class Nav extends Component {
  renderNav = () => {
    const { auth, location: { pathname } } = this.props;
    navOptions[pathname].isSelected = true; // set selected path for styling

    return auth.isAuthenticated ? this.renderSignedIn(auth) : this.renderSignedOut();
  };

  renderSignedOut = () => (
    <Wrapper>
      <TitleWrapper href="/">
        <Title href="/" style={nameStyle}>
          Playlist.io
        </Title>
        <MusicIcon size={22} />
      </TitleWrapper>
      <NavText>Welcome!</NavText>
    </Wrapper>
  );

  renderSignedIn = ({ name }) => (
    <Wrapper>
      <TabsWrapper>
        <TitleWrapper href="/">
          <Title style={nameStyle}>Playlist.io</Title>
          <MusicIcon size={22} />
        </TitleWrapper>
        {this.renderNavOptions(navOptions)}
      </TabsWrapper>
      <div>
        <Settings onClick={() => this.props.signOutUser()}>
          <div>{name}</div>
          <AngleWrapper>
            <AngleDown size={18} />
          </AngleWrapper>
        </Settings>
      </div>
    </Wrapper>
  );

  renderNavOptions = (navOptions) => pipe(values, this.mapNavOptions)(navOptions);

  mapNavOptions = (navOptions) => map(this.renderNavOption, navOptions);

  renderNavOption = ({ name, path, isSelected }) => (
    <NavText key={`${name}${path}`} href={path} isSelected={isSelected}>
      {name}
    </NavText>
  );

  render() {
    return <div>{this.renderNav()}</div>;
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { signOutUser })(withRouter(Nav));
