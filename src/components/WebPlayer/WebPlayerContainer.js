import { connect } from 'react-redux';

import WebPlayer from './WebPlayer';
import { signOutUser } from '../../actions/auth';
import { setDeviceId } from '../../actions/player';
import { getAccessToken } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state)
});

export default connect(mapStateToProps, { signOutUser, setDeviceId })(WebPlayer);
