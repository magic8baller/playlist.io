import styled from 'styled-components';

import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  ${media.tablet`height: 600px`};
`;
