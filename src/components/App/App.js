import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import HomeContainer from '../Home/HomeContainer';
import WebPlayerContainer from '../WebPlayer/WebPlayerContainer';
import NavContainer from '../Nav/NavContainer';
import NowPlayingContainer from '../NowPlaying/NowPlayingContainer';
import YourPlaylistsContainer from '../YourPlaylists/YourPlaylistsContainer';
import FavoritesContainer from '../Favorites/FavoritesContainer';
import { Wrapper } from './AppStyles';

const App = ({ playTrack, currentPlaylist }) => (
  <MuiThemeProvider>
    <Router>
      <Wrapper>
        <NavContainer />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/playlists" component={YourPlaylistsContainer} />
          <Route path="/playing" render={() => <NowPlayingContainer playTrack={playTrack} />} />
          <Route path="/favorites" component={FavoritesContainer} />
        </Switch>
        {currentPlaylist && <WebPlayerContainer playTrack={playTrack} />}
      </Wrapper>
    </Router>
  </MuiThemeProvider>
);

App.propTypes = {
  playTrack: func.isRequired,
  currentPlaylist: arrayOf(
    shape({
      artists: array.isRequired,
      isFavorited: bool,
      id: string.isRequired,
      album: object.isRequired
    })
  )
};

export default App;
