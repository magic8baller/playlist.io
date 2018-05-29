import { connect } from 'react-redux';

import Favorites from './Favorites';
import { getFavorites } from '../../reducers/favorites';
import { getNoSavedFavoritesError } from '../../reducers/errors';

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  noSavedFavoritesError: getNoSavedFavoritesError(state)
});

export default connect(mapStateToProps)(Favorites);
