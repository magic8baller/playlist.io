import React from 'react';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import { signInUser } from '../../actions/auth';
import { parseAuthParams } from './helpers';
import { SIGN_IN_USER_ENDPOINT } from '../../utils/endpoints';

class LandingPageContainer extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsedAuthParams = parseAuthParams(window.location.search);

    if (isEmpty(parsedAuthParams)) return;

    signInUser(parsedAuthParams);
    history.push('/');
  }

  handleBtnClick = () => {
    window.location = SIGN_IN_USER_ENDPOINT;
  };

  handleLoadedImg = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { isLoaded } = this.state;

    return (
      <LandingPage
        isLoaded={isLoaded}
        handleBtnClick={this.handleBtnClick}
        handleLoadedImg={this.handleLoadedImg}
      />
    );
  }
}

export default connect(null, { signInUser })(withRouter(LandingPageContainer));
