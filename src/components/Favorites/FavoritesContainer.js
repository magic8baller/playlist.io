import { connect } from 'react-redux';

import Favorites from './Favorites';
import { getFavorites } from '../../reducers/favorites';

const mapStateToProps = (state) => ({
  favorites: getFavorites(state)
});

export default connect(mapStateToProps)(Favorites);
