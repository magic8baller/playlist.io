import styled from 'styled-components';

import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 6rem auto;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 1.8rem;

  ${media.phone`font-size: 1.3rem`};
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 170px;
  border-radius: 4px;
  background-color: #1db954;
  margin: 2rem 0;
  border: 1px solid rgba(0, 184, 148, 0.3);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  color: #fff;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    transition: background-color 100ms ease-in;
  }
  &:focus {
    outline: none;
  }
`;

export const BtnText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-align: center;

  ${media.phone`font-size: 16px`};
`;
