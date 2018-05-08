import React, { Component } from 'react';
import { Field } from 'redux-form';

import * as Style from './SearchStyles';

class Search extends Component {
  handleFormSubmit = ({ query }) => {
    const { fetchPlaylist, accessToken, history, setPath } = this.props;

    fetchPlaylist(accessToken, query);

    const newPath = '/playing';
    setPath(history, newPath);
  };

  renderSearchField = ({ input }) => (
    <Style.Form {...input}>
      <Style.SearchIcon />
      <Style.Input
        autoFocus={true}
        placeholder="Ex: &quot;programming&quot;, &quot;workout&quot;, etc."
      />
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
            Enter a keyword and our robots will find the most popular songs in Spotify playlists
            with that word.
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

export default Search;
