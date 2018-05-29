import { connect } from 'react-redux';

import Home from './Home';
import { getIsAuthenticated } from '../../reducers/auth';

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default connect(mapStateToProps)(Home);
