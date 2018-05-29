import styled from 'styled-components';
import { Search } from 'react-feather';

import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  margin: 2.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

  ${media.phone`margin: 0 auto`};
`;

export const InnerWrapper = styled.div`
  width: 690px;
  margin: 8rem auto;
  display: flex;
  flex-direction: column;

  ${media.phone`width: 80vw`};
`;

export const Title = styled.div`
  font-size: 1.8rem;
  width: 650px;
  margin-bottom: 1rem;

  ${media.tablet`margin-bottom: 1rem`};
  ${media.tablet`font-size: 1.6rem`};
  ${media.tablet`width: 100%`};

  ${media.phone`font-size: 18px`};
`;

export const Form = styled.div`
  width: 690px;
  height: 65px;
  border-radius: 4px;
  box-shadow: rgba(29, 29, 31, 0.15) 0 10px 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 18px;
  margin: 0 auto;

  ${media.phone`height: 50px`};
  ${media.phone`width: 100%`};
`;

export const Input = styled.input`
  height: 95%;
  flex: 1;
  margin-left: 1rem;
  border: none;
  font-size: 18px;
  &:focus {
    outline: none;
  }

  ${media.phone`font-size: 16px`};
`;

export const Btn = styled.button`
  width: 90px;
  height: 45px;
  margin-right: 14px;
  margin-left: 20px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1db954;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }

  ${media.phone`margin-right: 8px`};
  ${media.phone`height: 40px`};
`;

export const BtnText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-align: center;

  ${media.phone`font-size: 16px`};
`;

export const SearchIcon = styled(Search)`
  margin-left: 1rem;
  z-index: 999;
  color: black;
  margin-top: 3px;
`;
