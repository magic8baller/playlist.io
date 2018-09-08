import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';

import SaveAnimation from './SaveAnimation';
import { toggleIsSaved } from '../../actions/events';
import { getIsSaved } from '../../reducers/events';

class SaveAnimationContainer extends Component {
  static propTypes = {
    isSaved: bool.isRequired,
    toggleIsSaved: func.isRequired,
    setTimeout: func.isRequired
  };

  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;

    const { isSaved, setTimeout, toggleIsSaved } = this.props;

    if (!isSaved) {
      this.handleClose();
      return;
    }

    this.handleOpen();
    setTimeout(toggleIsSaved, 1000); // === 1 second
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return <SaveAnimation open={this.state.open} handleClose={this.handleClose} />;
  }
}

const mapStateToProps = (state) => ({
  isSaved: getIsSaved(state)
});

export default connect(mapStateToProps, { toggleIsSaved })(ReactTimeout(SaveAnimationContainer));
