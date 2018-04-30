import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import map from 'lodash/map';
import InfiniteScroll from 'react-infinite-scroller';

import { Grid, GridWrapper, TracksGridWrapper, Text } from './TracksGridStyles';

class TracksGrid extends Component {
  renderTrack = ({ album: { artists, images }, name }, idx) => (
    <GridTile key={`${name}-${idx}`}>
      <img src={images[0].url} />
      <div>hello</div>
    </GridTile>
  );

  render() {
    const { tracks } = this.props;

    return (
      <TracksGridWrapper>
        <Text>🏅 Honorable Mentions</Text>
        <GridWrapper>
          {/* <InfiniteScroll
            pageStart={0}
            loadMore={}
            hasMore={true || false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }> */}
          <Grid cellHeight={180}>{map(tracks, this.renderTrack)}</Grid>
          {/* </InfiniteScroll> */}
        </GridWrapper>
      </TracksGridWrapper>
    );
  }
}

export default TracksGrid;
