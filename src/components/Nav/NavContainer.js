import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Nav from './Nav';
import { setPath } from '../../actions/nav';
import { getAuth } from '../../reducers/auth';
import { getPath } from '../../reducers/nav';
import { signOutUser } from '../../actions/auth';

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  path: getPath(state)
});

export default connect(mapStateToProps, { signOutUser, setPath })(withRouter(Nav));
