import React, { Component } from 'react';
import forEach from 'lodash/forEach';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { curry } from 'ramda';
import { func, string, object } from 'prop-types';

import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import navOptions from './data';
import { setPath } from '../../actions/nav';
import { getAuth } from '../../reducers/auth';
import { getPath } from '../../reducers/nav';
import { signOutUser } from '../../actions/auth';

class NavContainer extends Component {
  static propTypes = {
    signOutUser: func.isRequired,
    setPath: func.isRequired,
    auth: object.isRequired,
    path: string.isRequired
  };

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

  render() {
    const { auth, path } = this.props;

    // set selected path for styling
    forEach(navOptions, this.setIsSelected(path));

    return auth.isAuthenticated ? <SignedIn {...this} {...this.props} /> : <SignedOut />;
  }
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  path: getPath(state)
});

export default connect(mapStateToProps, { signOutUser, setPath })(withRouter(NavContainer));
