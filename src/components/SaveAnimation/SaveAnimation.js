import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactTimeout from 'react-timeout';

class SaveAnimation extends Component {
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
    setTimeout(toggleIsSaved, 4000); // === 2 seconds
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog title="Saved" modal={false} open={this.state.open} onRequestClose={this.handleClose}>
        <div>Save!</div>
      </Dialog>
    );
  }
}

export default ReactTimeout(SaveAnimation);
