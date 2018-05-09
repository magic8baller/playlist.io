import styled from 'styled-components';
import { GridTile } from 'material-ui/GridList';

export const GridItem = styled(GridTile)`
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '30px',
    gridAutoRows: 'minmax(100px, 250px)'
  },
  gridItemPlaceholder: {
    marginTop: '-20rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '30px',
    gridAutoRows: 'minmax(100px, 250px)'
  },
  placeholderWrapper: { width: '1200px', margin: '2.2rem auto' }
};
