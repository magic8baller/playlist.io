import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'ramda';
import { withRouter } from 'react-router-dom';

import * as Style from './SearchStyles';
import { fetchPlaylist } from '../../actions/search';

class Search extends Component {
  handleFormSubmit = ({ query }) => {
    const { fetchPlaylist, accessToken, history } = this.props;
    fetchPlaylist(accessToken, query);
    history.push('/playing');
  };

  renderSearchField = ({ input }) => (
    <Style.Form {...input}>
      <Style.SearchIcon />
      <Style.Input />
      <Style.Btn type="submit">
        <Style.BtnText>Search</Style.BtnText>
      </Style.Btn>
    </Style.Form>
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <Style.Wrapper>
        <Style.InnerWrapper>
          <Style.Title>
            Enter a keyword and we'll create a playlist from the most popular Spotify songs in
            playlists with that title
          </Style.Title>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field
              name="query"
              type="text"
              component={this.renderSearchField}
              placeholder="Enter a keyword..."
            />
          </form>
        </Style.InnerWrapper>
      </Style.Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  playlists: state.playlists
});

export default reduxForm({
  form: 'search'
})(connect(mapStateToProps, { fetchPlaylist })(withRouter(Search)));
