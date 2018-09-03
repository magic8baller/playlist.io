import React from 'react';
import styled from 'styled-components';

import {
  DashboardWrapper,
  ContentWrapper,
  HeadingText,
  FeaturedWrapper,
  AllTracksWrapper,
  NonFeaturedWrapper,
  PopularWrapper
} from './styles';
import PopularTracks from '../PopularTracks';
import TrendingTracks from '../TrendingTracks';
import SidePanelContainer from '../SidePanel/container';
import TopTracks from '../TopTracks';
import AllTracks from '../AllTracks';
import colors from '../../utils/colors';

const Dashboard = ({ tracks: { popular, featured, other, trending } }) => (
  <DashboardWrapper>
    <SidePanelContainer />
    <ContentWrapper>
      <div>
        <FeaturedWrapper>
          <HeadingText>Featured</HeadingText>
          <TopTracks topTracks={featured} />
        </FeaturedWrapper>
      </div>
      <NonFeaturedWrapper>
        <AllTracksWrapper>
          <HeadingText style={{ marginBottom: '1.2rem' }}>All</HeadingText>
          <AllTracks allTracks={other} />
        </AllTracksWrapper>
        <div>
          <PopularWrapper>
            <HeadingText>Popular</HeadingText>
            <PopularTracks popularTracks={popular} />
          </PopularWrapper>
          <div style={{ marginTop: '2.2rem' }}>
            <HeadingText>Trending</HeadingText>
            <TrendingTracks trendingTracks={trending} />
          </div>
        </div>
      </NonFeaturedWrapper>
    </ContentWrapper>
  </DashboardWrapper>
);

export default Dashboard;
