import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './Search';
import { fetchPlaylist } from '../../actions/search';
import { setPath } from '../../actions/nav';
import { getAccessToken } from '../../reducers/search';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state)
});

export default reduxForm({
  form: 'search'
})(connect(mapStateToProps, { fetchPlaylist, setPath })(withRouter(Search)));
