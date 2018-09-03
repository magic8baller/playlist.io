import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SidePanel from './';
import { signOutUser } from '../../actions/auth';

class SidePanelContainer extends Component {
  handleSignOutClick = () => {
    const { history, signOutUser } = this.props;

    signOutUser();
    history.push('/');
  };

  render() {
    return <SidePanel handleSignOutClick={this.handleSignOutClick} />;
  }
}

export default connect(null, { signOutUser })(withRouter(SidePanelContainer));
