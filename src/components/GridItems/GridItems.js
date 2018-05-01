import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import map from 'lodash/map';
import InfiniteScroll from 'react-infinite-scroller';

const imgStyle = {
  backgroundColor: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))'
};

class GridItems extends Component {
  state = {
    nextTracks: [],
    pointer: 0,
    hasMoreTracks: true
  };

  loadTracks = async () => {
    const { allTracks } = this.props;
    const { pointer } = this.state;

    const tracksToRender = 16;
    const nextPointer = pointer + tracksToRender;

    if (!allTracks[nextPointer]) {
      await this.setState({ hasMoreTracks: false });
      return;
    }

    const nextTracks = allTracks.slice(pointer, nextPointer);

    await this.setState({ pointer: nextPointer });

    await this.setState({ nextTracks });
  };

  renderTrack = ({ album: { artists, images }, name }, idx) => (
    <GridTile key={`${name}-${idx}`} title={name} subtitle={<span>{artists[0].name}</span>}>
      <img style={imgStyle} src={images[0].url} />
    </GridTile>
  );

  render() {
    const { allTracks } = this.props;
    const { hasMoreTracks, nextTracks } = this.state;

    const loader = <div key={0}>Loading ...</div>;

    const currentTracks = map(nextTracks, this.renderTrack);

    return (
      <div>
        {currentTracks && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadTracks}
            hasMore={hasMoreTracks}
            loader={loader}>
            {currentTracks}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default GridItems;
