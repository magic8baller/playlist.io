import React, { Component } from 'react';
import { Field } from 'redux-form';

import * as Style from './SearchStyles';
import media from '../../utils/mediaTemplate';
import { HomeBackgroundPlaceholder } from '../Home/HomePlaceholder';
import { HomePlaceholderWrapper, BackgroundImg } from '../Home/HomeStyles';
import '../Home/styles.css';

const getClassName = (loaded) => (loaded ? '' : 'wrapper__hide');

class Search extends Component {
  state = {
    loaded: false
  };

  handleFormSubmit = ({ query }) => {
    const { fetchPlaylist, accessToken, history, setPath } = this.props;

    fetchPlaylist(accessToken, query);

    const newPath = '/playing';
    setPath(history, newPath);
  };

  handleLoadedImg = () => {
    this.setState({ loaded: true });
  };

  renderSearchField = ({ input }) => (
    <Style.Form {...input}>
      <Style.SearchIcon />
      <Style.Input autoFocus placeholder={'Ex: "programming", "workout", etc.'} />
      <Style.Btn type="submit">
        <Style.BtnText>Search</Style.BtnText>
      </Style.Btn>
    </Style.Form>
  );

  render() {
    const { handleSubmit } = this.props;
    const { loaded } = this.state;

    return (
      <div>
        <Style.Wrapper className={getClassName(loaded)}>
          <BackgroundImg
            onLoad={this.handleLoadedImg}
            src="https://source.unsplash.com/wejxKZ-9IZg/1500x800"
          />
          <Style.InnerWrapper>
            <Style.Title>
              Enter a keyword and our robots will find popular songs in Spotify playlists titled
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
        {!loaded && (
          <HomePlaceholderWrapper>
            <HomeBackgroundPlaceholder />
          </HomePlaceholderWrapper>
        )}
      </div>
    );
  }
}

export default Search;
