import { connect } from 'react-redux';

import YourPlaylists from './YourPlaylists';
import { setCurrentPlaylist } from '../../actions/playlists';
import { setPath } from '../../actions/nav';
import { getPlaylists } from '../../reducers/playlists';

const mapStateToProps = (state) => ({
  playlists: getPlaylists(state)
});

export default connect(mapStateToProps, { setCurrentPlaylist, setPath })(YourPlaylists);
