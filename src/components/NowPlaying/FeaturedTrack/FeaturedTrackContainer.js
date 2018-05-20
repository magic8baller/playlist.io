import { connect } from 'react-redux';

import FeaturedTrack from './FeaturedTrack';
import { addFavorite, deleteFavorite } from '../../../actions/favorites';
import { getSpotifyId } from '../../../reducers/auth';
import { getCurrentQuery } from '../../../reducers/search';

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  query: getCurrentQuery(state)
});

export default connect(mapStateToProps, { addFavorite, deleteFavorite })(FeaturedTrack);
