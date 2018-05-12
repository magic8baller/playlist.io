import React from 'react';

import LandingPageContainer from '../LandingPage/LandingPageContainer';
import SearchContainer from '../Search/SearchContainer';

export default ({ isAuthenticated }) => (
  <div>{isAuthenticated ? <SearchContainer /> : <LandingPageContainer />}</div>
);
