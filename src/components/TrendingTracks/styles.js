import styled from 'styled-components';

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
