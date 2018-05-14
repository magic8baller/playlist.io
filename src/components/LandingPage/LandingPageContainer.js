import React from 'react';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import { signInUser } from '../../actions/auth';
import { parseAuthParams } from './helpers';

const signInUserEndpoint = 'https://playlist-io-backend.herokuapp.com/api/authorize';

class LandingPageContainer extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsed = parseAuthParams(window.location.search);

    if (isEmpty(parsed)) return;

    signInUser(parsed);
    history.push('https://playlist-io.netlify.com/');
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
