import { connect } from 'react-redux';

import WebPlayer from './WebPlayer';
import { getAccessToken } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state)
});

export default connect(mapStateToProps)(WebPlayer);
