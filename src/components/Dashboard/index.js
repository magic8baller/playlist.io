import React from 'react';

import {
  HeadingText,
  FeaturedWrapper,
  AllTracksWrapper,
  NonFeaturedWrapper,
  PopularWrapper
} from './styles';
import Template from '../Template';
import PopularTracks from '../PopularTracks';
import TrendingTracks from '../TrendingTracks';
import TopTracks from '../TopTracks';
import AllTracks from '../AllTracks';

const Dashboard = ({ tracks: { popular, featured, other, trending }, playTrack }) => (
  <Template>
    <div>
      <FeaturedWrapper>
        <HeadingText>Featured</HeadingText>
        <TopTracks topTracks={featured} playTrack={playTrack} />
      </FeaturedWrapper>
    </div>
    <NonFeaturedWrapper>
      <AllTracksWrapper>
        <HeadingText style={{ marginBottom: '1.2rem' }}>All</HeadingText>
        <AllTracks allTracks={other} playTrack={playTrack} />
      </AllTracksWrapper>
      <div>
        <PopularWrapper>
          <HeadingText>Popular</HeadingText>
          <PopularTracks popularTracks={popular} playTrack={playTrack} />
        </PopularWrapper>
        <div style={{ marginTop: '2.2rem' }}>
          <HeadingText>Trending</HeadingText>
          <TrendingTracks trendingTracks={trending} playTrack={playTrack} />
        </div>
      </div>
    </NonFeaturedWrapper>
  </Template>
);

export default Dashboard;
