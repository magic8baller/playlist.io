import React from 'react';
import ContentLoader, { Instagram } from 'react-content-loader';

import * as Style from './NowPlayingStyles';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';

const TopFiveTrackPlaceholder = () => (
  <ContentLoader height={120} width={400} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="100" y="20" rx="10" ry="10" width="230" height="13" />
    <rect x="100" y="45" rx="10" ry="10" width="170" height="13" />
    <rect x="14" y="11.05" rx="0" ry="0" width="60" height="60" />
  </ContentLoader>
);

const RandomPicPlaceholder = () => (
  <ContentLoader
    style={{ width: '452px', height: '452px' }}
    height={452}
    width={452}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <rect x="0" y="0" rx="5" ry="5" width="452" height="452" />
  </ContentLoader>
);

const HeadlinePlaceholder = () => (
  <ContentLoader
    style={{ width: '300px' }}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <rect x="40" y="11" rx="4" ry="4" width="125" height="8" />
    <circle cx="15" cy="15" r="15" />
  </ContentLoader>
);

const renderTopFiveTrackPlaceholder = () => {
  let result = [];

  for (let i = 0; i < 5; i++) {
    result.push(<TopFiveTrackPlaceholder />);
  }

  return result;
};

const NowPlayingLoader = ({}) => {
  const tracks = renderTopFiveTrackPlaceholder();
  return (
    <div>
      <Style.Wrapper>
        <Style.ContentWrapper>
          <Style.Picture>
            <HeadlinePlaceholder />
            <RandomPicPlaceholder />
          </Style.Picture>
          <div>
            <div>
              <HeadlinePlaceholder />
            </div>
            <Style.Tracks style={{}}>{tracks}</Style.Tracks>
          </div>
        </Style.ContentWrapper>
      </Style.Wrapper>

      {/* <Style.TracksGridWrapper>
        <TracksGrid allTracks={current} />
      </Style.TracksGridWrapper> */}
    </div>
  );
};

export default NowPlayingLoader;
