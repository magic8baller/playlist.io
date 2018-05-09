import { connect } from 'react-redux';

import SaveAnimation from './SaveAnimation';
import { toggleIsSaved } from '../../actions/events';
import { getIsSaved } from '../../reducers/events';

const mapStateToProps = (state) => ({
  isSaved: getIsSaved(state)
});

export default connect(mapStateToProps, { toggleIsSaved })(SaveAnimation);
