import React from 'react';
import styled from 'styled-components';

import { DashboardWrapper, ContentWrapper, HeadingText, FeaturedWrapper, Wrapper } from './styles';
import SidePanelContainer from '../SidePanel/container';
import TopTracks from '../TopTracks';
import AllTracks from '../AllTracks';
import colors from '../../utils/colors';

const Dashboard = ({ allTracks, topTracks }) => (
  <DashboardWrapper>
    <SidePanelContainer />
    <ContentWrapper>
      <FeaturedWrapper>
        <HeadingText>Featured</HeadingText>
        <TopTracks topTracks={topTracks} />
      </FeaturedWrapper>
      <Wrapper>
        <HeadingText style={{ marginBottom: '1rem' }}>All</HeadingText>
        <AllTracks allTracks={allTracks} />
      </Wrapper>
    </ContentWrapper>
  </DashboardWrapper>
);

export default Dashboard;
