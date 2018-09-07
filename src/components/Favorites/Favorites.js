import React from 'react';
import { isEmpty } from 'ramda';
import { func, arrayOf, shape, array, bool, string, object } from 'prop-types';

import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import { Grid } from '../TracksGrid/TracksGridStyles';
import Template from '../Template';
import { HeadingText } from '../Dashboard/styles';
import { getSubtext } from '../../utils/helpers';
import {
  Wrapper,
  TextWrapper,
  Subtext,
  PlaylistWrapper,
  AlbumArt,
  AnotherTextWrapper,
  TitleText,
  SongCount
} from '../Playlists/styles';

const Favorites = ({ favorites, noSavedFavoritesError, playTrack }) =>
  isEmpty(favorites) ? (
    <ErrorPageContainer
      headingText="Favorites"
      subtext={getSubtext(favorites, 'favorite')}
      errorMsg={noSavedFavoritesError}
    />
  ) : (
    renderFavorites(favorites, playTrack)
  );

const renderFavorites = (favorites, playTrack) => (
  <Template headingText="Favorites" subtext={getSubtext(favorites, 'favorite')}>
    <Grid>{favorites.map(renderFavorite(playTrack))}</Grid>
  </Template>
);

const renderFavorite = (playTrack) => ({ album: { artists, images }, name }, idx) => (
  <PlaylistWrapper onClick={() => playTrack(idx)} key={`${name}-${idx}`}>
    <AlbumArt src={images[1].url} />
    <AnotherTextWrapper>
      <TitleText>{name}</TitleText>
      <SongCount>{artists[0].name}</SongCount>
    </AnotherTextWrapper>
  </PlaylistWrapper>
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
