import React from 'react';
import ContentLoader from 'react-content-loader';

export const GridItemPlaceholder = () => (
  <ContentLoader speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="0" y="0" rx="5" ry="5" width="80" height="80" />
  </ContentLoader>
);

export const Headline = () => (
  <ContentLoader speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="19" y="4" rx="4" ry="4" width="125" height="5" />
    <circle cx="7" cy="7" r="7" />
  </ContentLoader>
);
