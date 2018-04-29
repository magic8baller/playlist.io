import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'ramda';

import { fetchPlaylist } from '../../actions/search';

class Search extends Component {
  componentDidMount() {
    this.initFetchPlaylist();
  }

  initFetchPlaylist = async () => {
    const { fetchPlaylist, accessToken } = this.props;
    const query = 'programming';
    await fetchPlaylist(accessToken, query);
  };

  render() {
    if (!isEmpty(this.props.playlists)) console.log(this.props.playlists);

    return <div>Search Page</div>;
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  playlists: state.playlists
});

export default connect(mapStateToProps, { fetchPlaylist })(Search);
