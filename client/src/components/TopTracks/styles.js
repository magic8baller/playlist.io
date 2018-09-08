import styled from 'styled-components';
import colors from '../../utils/colors';

export const AlbumArt = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 4px;

  &:hover {
    transition: 20ms 10ms ease-in;
    cursor: pointer;
  }
`;

export const TopTracksWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;
`;

export const TopTrackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
`;

export const TopTrackName = styled.div`
  color: ${colors.font};
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  font-size: 14px;
  font-weight: bold;
`;

export const TopTrackArtistName = styled.div`
  opacity: 0.5;
`;
