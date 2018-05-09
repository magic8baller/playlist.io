import React from 'react';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';
import { style } from './NowPlayingStyles';

const randomPicEndpoint = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper';

const renderTopFiveTrackPlaceholder = () => {
  let result = [];

  for (let i = 0; i < 5; i++) {
    result = [...result, <Placeholder.TopFiveTrack key={i} />];
  }

  return result;
};

const NowPlayingLoader = ({ handleLoadedPic }) => {
  const tracks = renderTopFiveTrackPlaceholder();

  return (
    <div>
      <Style.Wrapper>
        <Style.ContentWrapper>
          <Style.Picture>
            <Placeholder.Headline />
            <Placeholder.RandomPic />
            <Style.RandomPic
              alt="Random Pic"
              src={randomPicEndpoint}
              onLoad={handleLoadedPic}
              style={style.dummyRandomPic}
            />
          </Style.Picture>
          <div>
            <div>
              <Placeholder.Headline />
            </div>
            <Style.Tracks style={style.tracks}>{tracks}</Style.Tracks>
          </div>
        </Style.ContentWrapper>
      </Style.Wrapper>
    </div>
  );
};

export default NowPlayingLoader;
