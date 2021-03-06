import styled from 'styled-components';
import { Heart } from 'react-feather';

import media from '../../../utils/mediaTemplate';

export const ArtistName = styled.div`
  opacity: 0.6;
`;

export const Data = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TrackWrapper = styled.div`
  margin: 2.6rem 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }

  ${media.phone`margin: 1.5rem 0`};
  ${media.phone`width: 89vw`};
`;

export const HeartIcon = styled(Heart)`
  margin-top: 4px;
  color: #1db954;
  fill: ${(props) => (props.isColored ? '#1db954' : '#fff')};
`;

export const heart = {
  marginTop: '4px',
  color: '#1db954'
};
