import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from '../LandingPage/LandingPage';
import Search from '../Search/Search';

class Home extends Component {
  renderView = () => (this.props.isAuthenticated ? <Search /> : <LandingPage />);

  render() {
    return <div>{this.renderView()}</div>;
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Home);
