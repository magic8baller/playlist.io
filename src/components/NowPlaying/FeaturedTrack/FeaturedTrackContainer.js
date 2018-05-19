import { connect } from 'react-redux';

import FeaturedTrack from './FeaturedTrack';
import { addFavorite, deleteFavorite } from '../../../actions/favorites';
import { getSpotifyId } from '../../../reducers/auth';

const mapStateToProps = (state) => ({
  spotifyId: getSpotifyId(state)
});

export default connect(mapStateToProps, { addFavorite, deleteFavorite })(FeaturedTrack);
