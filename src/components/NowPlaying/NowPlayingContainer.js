import { connect } from 'react-redux';

import NowPlaying from './NowPlaying';
import { getCurrentTracks } from '../../reducers/playlists';

const mapStateToProps = (state) => ({
  current: state.playlists.current
});

export default connect(mapStateToProps)(NowPlaying);
