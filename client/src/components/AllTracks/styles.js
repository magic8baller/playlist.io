import styled from 'styled-components';
import { Heart } from 'react-feather';
import colors from '../../utils/colors';

export const AllTracksWrapper = styled.div`
  overflow-y: scroll;
  margin-bottom: 2rem;
  max-height: 287px;
`;

export const AllTrackWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin-bottom: 2px;
  border-radius: 3.5px;
  font-size: 11.5px;
  padding: 10px;

  &:hover {
    background-color: #ecf0f1;
    transition: 20ms 10ms ease-in;
    cursor: pointer;
  }
`;

export const TrackInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AllTrackName = styled.div`
  font-size: 13px;
`;

export const AllTrackArtistName = styled.div`
  opacity: 0.5;
`;

export const FavoritedHeart = styled(Heart)`
  color: ${colors.primary};
`;
