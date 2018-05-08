import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import NowPlayingContainer from '../NowPlaying/NowPlayingContainer';
import YourPlaylists from '../YourPlaylists/YourPlaylists';
import { Wrapper, AppStyles } from './AppStyles';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Wrapper>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/playing" component={NowPlayingContainer} />
          <Route path="/playlists" component={YourPlaylists} />
        </Switch>
      </Wrapper>
    </Router>
  </MuiThemeProvider>
);

export default App;
