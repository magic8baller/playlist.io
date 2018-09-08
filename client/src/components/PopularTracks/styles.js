import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -5px;
`;

export const PopularAlbumArt = styled.img`
  width: 200px;
  height: 110px;
  border-radius: 4px;
  filter: brightness(50%);

  &:hover {
    filter: brightness(100%);
    transition: 20ms 10ms ease-in;
    cursor: pointer;
  }
`;

export const PopularTrackName = styled.div`
  margin-bottom: 5px;
`;

export const PopularTrackWrapper = styled.div`
  position: relative;
  margin-right: 2rem;
`;

export const PopularArtistName = styled.div`
  font-size: 11px;
  opacity: 0.7;
`;

export const PopularTrackInfoWrapper = styled.div`
  position: absolute;
  top: 40px;
  margin: 0 10px;
  color: #fff;
  font-size: 12px;
`;
