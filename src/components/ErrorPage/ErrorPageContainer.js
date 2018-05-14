import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import { setPath } from '../../actions/nav';

export default connect(null, { setPath })(withRouter(ErrorPage));
