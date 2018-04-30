import styled from 'styled-components';
import { GridList, GridTile } from 'material-ui/GridList';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  grid-auto-rows: minmax(100px, 300px);
`;

export const GridWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
