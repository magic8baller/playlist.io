import styled from 'styled-components';

import media from '../../utils/mediaTemplate';
import colors from '../../utils/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  padding: 8rem;
  margin: 2rem auto;
  width: 500px;
  border-radius: 4px;
  align-items: center;
  box-shadow: rgba(23, 43, 99, 0.26) 0 7px 42px;
`;

export const Text = styled.div`
  font-size: 1.8rem;

  ${media.phone`font-size: 1.3rem`};
`;

export const Btn = styled.button`
  margin-top: 2rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  padding: 0.8em 1.5em;
  outline: 0;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.2222222;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
  cursor: pointer;
  background: ${colors.primary};

  &:hover {
    filter: brightness(95%);
    cursor: pointer;
    transition: background 150ms ease-in;
  }
`;

export const BtnText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-align: center;

  ${media.phone`font-size: 16px`};
`;
