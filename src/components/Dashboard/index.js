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
import SidePanelContainer from '../SidePanel/container';
import TopTracks from '../TopTracks';
import AllTracks from '../AllTracks';
import colors from '../../utils/colors';

export const TrendingTracksWrapper = styled.div`
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TrendingTrackWrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  width: 180px;
  height: 50px;
  padding: 1rem;
  display: flex;
`;

export const TrendingTrackAlbumArt = styled.img`
  width: 50px;
  height: 50px;
`;

export const TrendingTrackName = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

export const TrendingTrackArtist = styled.div`
  font-size: 11px;
  opacity: 0.5;
`;

const renderTrendingTrack = ({ album: { artists, images }, name }, idx) => (
  <TrendingTrackWrapper>
    <TrendingTrackAlbumArt src={images[1].url} />
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
      <TrendingTrackName>{name}</TrendingTrackName>
      <TrendingTrackArtist>{artists[0].name}</TrendingTrackArtist>
    </div>
  </TrendingTrackWrapper>
);

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
            <TrendingTracksWrapper>{trending.map(renderTrendingTrack)}</TrendingTracksWrapper>
          </div>
        </div>
      </NonFeaturedWrapper>
    </ContentWrapper>
  </DashboardWrapper>
);

export default Dashboard;
