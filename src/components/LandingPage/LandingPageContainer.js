import React from 'react';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, object } from 'prop-types';

import LandingPage from './LandingPage';
import spotifyData from '../../utils/data/marshmello';
import { saveDemoCurrentPlaylist } from '../../actions/playlists';
import { signInUser, registerDemoUser } from '../../actions/auth';
import { parseAuthParams } from './helpers';
import { SIGN_IN_USER_ENDPOINT } from '../../utils/endpoints';

class LandingPageContainer extends React.Component {
  static propTypes = {
    signInUser: func.isRequired,
    history: object.isRequired
  };

  state = {
    isLoaded: false
  };

  componentDidMount() {
    const { signInUser, history } = this.props;
    const parsedAuthParams = parseAuthParams(window.location.search);

    if (isEmpty(parsedAuthParams)) return;

    signInUser(parsedAuthParams);

    history.push('/search');
  }

  handleAuth = () => {
    window.location = SIGN_IN_USER_ENDPOINT;
  };

  handleLoadedImg = () => {
    this.setState({ isLoaded: true });
  };

  handleDemoClick = () => {
    const { registerDemoUser, history, saveDemoCurrentPlaylist } = this.props;

    saveDemoCurrentPlaylist(spotifyData, () => {
      registerDemoUser();
      history.push('/songs');
    });
  };

  render() {
    const { isLoaded } = this.state;

    return (
      <LandingPage
        isLoaded={isLoaded}
        handleAuth={this.handleAuth}
        handleLoadedImg={this.handleLoadedImg}
        handleDemoClick={this.handleDemoClick}
      />
    );
  }
}

export default connect(null, { signInUser, registerDemoUser, saveDemoCurrentPlaylist })(
  withRouter(LandingPageContainer)
);
