import React from 'react';
import ContentLoader from 'react-content-loader';

export const HomeBackgroundPlaceholder = () => (
  <ContentLoader
    style={{ height: '100%' }}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
  </ContentLoader>
);
