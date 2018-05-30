import React from 'react';
import { isEmpty } from 'ramda';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { Grid, TracksGridWrapper, Text } from '../TracksGrid/TracksGridStyles';
import { TrackTile } from '../Tracks/TrackStyle';

const Favorites = ({ favorites, noSavedFavoritesError, playTrack }) =>
  isEmpty(favorites)
    ? renderErrorPage(noSavedFavoritesError)
    : renderFavorites(favorites, playTrack);

const renderErrorPage = (noSavedFavoritesError) => (
  <ErrorPageContainer errorMsg={noSavedFavoritesError} />
);

const renderFavorites = (favorites, playTrack) => (
  <div>
    <TracksGridWrapper>
      <Text>
        <span role="img" aria-label="Fire">
          🔥
        </span>{' '}
        Favorites
      </Text>
      <Grid>{favorites.map(renderFavorite(playTrack))}</Grid>
    </TracksGridWrapper>
  </div>
);

const renderFavorite = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <TrackTile
    key={`${name}-${idx}`}
    onClick={() => playTrack(idx)}
    title={name}
    subtitle={<span>{artists[0].name}</span>}>
    <img alt="Album" src={images[0].url} />
  </TrackTile>
);

Favorites.propTypes = {
  playTrack: func.isRequired,
  noSavedFavoritesError: string.isRequired,
  favorites: arrayOf(
    shape({
      artists: array,
      isFavorited: bool,
      id: string,
      album: object
    })
  )
};

export default Favorites;
