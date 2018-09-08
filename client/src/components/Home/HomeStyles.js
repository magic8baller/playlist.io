import styled from 'styled-components';
import media from '../../utils/mediaTemplate';

export const HomePlaceholderWrapper = styled.div`
  margin: 2.5rem auto;
  height: 80vh;

  ${media.phone`margin: 0 auto`};
`;

export const BackgroundImg = styled.img`
  position: absolute;
  z-index: -999;
  height: 80vh;
  width: 100%;
`;
