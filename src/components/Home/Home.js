import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPageContainer from '../LandingPage/LandingPageContainer';
import SearchContainer from '../Search/SearchContainer';

class Home extends Component {
  renderView = () => (this.props.isAuthenticated ? <SearchContainer /> : <LandingPageContainer />);

  render() {
    return <div>{this.renderView()}</div>;
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Home);
