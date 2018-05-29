import React from 'react';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import { style } from './NowPlayingStyles';

const renderTopFiveTrackPlaceholder = () => {
  let result = [];

  for (let i = 0; i < 5; i++) {
    result = [...result, <Placeholder.TopFiveTrack key={i} />];
  }

  return result;
};

const NowPlayingLoader = () => {
  const tracks = renderTopFiveTrackPlaceholder();

  return (
    <div>
      <Style.Wrapper>
        <Style.ContentWrapper>
          <Style.Picture>
            <Placeholder.Headline />
            <Placeholder.RandomPic />
            <Style.TopTrackWrapper />
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
