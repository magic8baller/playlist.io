import styled from 'styled-components';

import media from '../../utils/mediaTemplate';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  grid-auto-rows: minmax(100px, 250px);
  justify-content: center;

  ${media.tablet`grid-gap: 40px;`};
  ${media.tablet`grid-template-columns: repeat(3, 1fr);`};
  ${media.tablet`grid-auto-rows: minmax(100px, 250px);`};
  ${media.tablet`margin-left: 1rem;`};

  ${media.phone`grid-template-columns: 300px;`};
  ${media.phone`grid-auto-rows: minmax(100px, 250px);`};
`;

export const GridWrapper = styled.div`
  margin: 0 auto;
`;

export const TracksGridWrapper = styled.div`
  width: 90vw;
  margin: 3rem auto 10rem;

  ${media.tablet`width: 95vw;`};
`;

export const Text = styled.div`
  font-size: 1.8rem;
  margin-bottom: 3rem;

  ${media.phone`text-align: center;`};
`;
