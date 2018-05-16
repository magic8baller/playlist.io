import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  grid-auto-rows: minmax(100px, 250px);
`;

export const GridWrapper = styled.div`
  margin: 0 auto;
`;

export const TracksGridWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const Text = styled.div`
  font-size: 1.8rem;
  margin-bottom: 3rem;
`;
