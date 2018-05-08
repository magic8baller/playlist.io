import React from 'react';
import ContentLoader from 'react-content-loader';

import { style } from './NowPlayingStyles';

export const TopFiveTrack = () => (
  <ContentLoader height={120} width={400} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="100" y="20" rx="10" ry="10" width="230" height="13" />
    <rect x="100" y="45" rx="10" ry="10" width="170" height="13" />
    <rect x="14" y="11.05" rx="0" ry="0" width="60" height="60" />
  </ContentLoader>
);

export const RandomPic = () => (
  <ContentLoader
    style={style.randomPic}
    height={452}
    width={452}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <rect x="0" y="0" rx="5" ry="5" width="452" height="452" />
  </ContentLoader>
);

export const Headline = () => (
  <ContentLoader style={style.headline} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="40" y="11" rx="4" ry="4" width="125" height="8" />
    <circle cx="15" cy="15" r="15" />
  </ContentLoader>
);
