import { connect } from 'react-redux';

import FeaturedTrack from './FeaturedTrack';
import { addFavorite, deleteFavorite } from '../../../actions/favorites';
import { getSpotifyId } from '../../../reducers/auth';
import { getCurrentQuery } from '../../../reducers/search';
import { getUserId } from '../../../reducers/userId';

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state),
  query: getCurrentQuery(state),
  userId: getUserId(state)
});

export default connect(mapStateToProps, { addFavorite, deleteFavorite })(FeaturedTrack);
