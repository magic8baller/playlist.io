import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import { signInUser } from '../../actions/auth';

export default connect(null, { signInUser })(withRouter(LandingPage));
