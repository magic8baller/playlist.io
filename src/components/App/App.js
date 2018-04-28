import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage/LandingPage';
import Nav from '../Nav/Nav';
import { Wrapper, AppStyles } from './AppStyles';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Wrapper>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Wrapper>
    </Router>
  </MuiThemeProvider>
);

export default App;
