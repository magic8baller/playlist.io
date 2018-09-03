import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { func, arrayOf, shape, array, bool, string, object, oneOfType } from 'prop-types';

import HomeContainer from '../Home/HomeContainer';
import WebPlayerContainer from '../WebPlayer/WebPlayerContainer';
import NavContainer from '../Nav/NavContainer';
import NowPlayingContainer from '../NowPlaying/NowPlayingContainer';
import YourPlaylistsContainer from '../YourPlaylists/YourPlaylistsContainer';
import FavoritesContainer from '../Favorites/FavoritesContainer';
import DashboardContainer from '../Dashboard/container';
import { Wrapper } from './AppStyles';

const App = ({ playTrack, currentPlaylist }) => (
  <MuiThemeProvider>
    <Router>
      <Wrapper>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/playlists" component={YourPlaylistsContainer} />
          <Route path="/dashboard" render={() => <DashboardContainer playTrack={playTrack} />} />
          <Route path="/favorites" component={FavoritesContainer} />
        </Switch>
        {currentPlaylist && <WebPlayerContainer playTrack={playTrack} />}
      </Wrapper>
    </Router>
  </MuiThemeProvider>
);

App.propTypes = {
  playTrack: func.isRequired,
  currentPlaylist: oneOfType([
    string,
    arrayOf(
      shape({
        artists: array.isRequired,
        isFavorited: bool,
        id: string.isRequired,
        album: object.isRequired
      })
    )
  ])
};

export default App;
