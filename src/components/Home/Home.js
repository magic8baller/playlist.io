import React from 'react';
import { bool } from 'prop-types';

import LandingPageContainer from '../LandingPage/LandingPageContainer';
import SearchContainer from '../Search/SearchContainer';

const Home = ({ isAuthenticated }) => (
  <div>{isAuthenticated ? <SearchContainer /> : <LandingPageContainer />}</div>
);

Home.propTypes = {
  isAuthenticated: bool.isRequired
};

export default Home;
