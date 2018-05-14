import React from 'react';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import { signInUser } from '../../actions/auth';

const signInUserEndpoint = 'http://localhost:8080/api/authorize';

const parseAuthParams = (params) => {
  const authParams = new URLSearchParams(params);

  let parsed = {};

  // Display the key/value pairs
  for (let pair of authParams.entries()) {
    parsed[pair[0]] = pair[1];
  }

  return parsed;
};

class LandingPageContainer extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsed = parseAuthParams(window.location.search);

    if (isEmpty(parsed)) return;

    signInUser(parsed);
    history.push('/');
  }

  handleBtnClick = () => {
    window.location = signInUserEndpoint;
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
