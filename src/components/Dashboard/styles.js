import styled from 'styled-components';
import colors from '../../utils/colors';

export const DashboardWrapper = styled.div`
  background-color: #e9ebee;
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  margin: 0 4rem;
  width: 100%;
`;

export const HeadingText = styled.div`
  color: ${colors.font};
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.7px;
`;

export const FeaturedWrapper = styled.div`
  margin-top: 4.2rem;
`;

export const Wrapper = styled.div`
  margin-top: 1.5rem;
  width: 40%;
`;
