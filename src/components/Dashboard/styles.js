import styled from 'styled-components';
import colors from '../../utils/colors';

export const DashboardWrapper = styled.div`
  background-color: #e9ebee;
  display: flex;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  margin: 0 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeadingText = styled.div`
  color: ${colors.font};
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.7px;
  margin-bottom: 1.5rem;
`;

export const FeaturedWrapper = styled.div`
  margin-top: 4.2rem;
`;

export const AllTracksWrapper = styled.div`
  width: 40%;
  margin-right: 2rem;
`;

export const PopularWrapper = styled.div``;

export const NonFeaturedWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;
