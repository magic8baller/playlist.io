import styled from 'styled-components';
import { GridList } from 'material-ui/GridList';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  grid-auto-rows: minmax(100px, 300px);
`;

export const GridTile = styled.div`
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
`;

export const GridWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const TracksGridWrapper = styled.div`
  margin-top: 2rem;
`;

export const Text = styled.div`
  font-size: 1.8rem;
  margin-bottom: 3rem;
`;

export const TrackImg = styled.img`
  height: 100%;
  transform: translateX(-50%);
  position: relative;
  left: 50%;
`;
