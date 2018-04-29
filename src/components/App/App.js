import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import LandingPage from '../LandingPage/LandingPage';
import Nav from '../Nav/Nav';
import { Wrapper, AppStyles } from './AppStyles';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Wrapper>
        <Route path="/" component={Nav} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={LandingPage} />
        </Switch>
      </Wrapper>
    </Router>
  </MuiThemeProvider>
);

export default App;
