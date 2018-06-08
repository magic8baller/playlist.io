import styled from 'styled-components';
import { Search, ChevronDown } from 'react-feather';

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

  ${media.phone`font-size: 14px`};
`;

export const Form = styled.div`
  width: 690px;
  height: 65px;
  border-radius: 4px;
  box-shadow: rgba(29, 29, 31, 0.15) 0 10px 60px;
  border: 2px solid #ecf0f1;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 18px;
  margin: 0 auto;

  ${media.phone`width: 100%`};
`;

export const Input = styled.input`
  height: 95%;
  flex: 1;
  border: none;
  margin-left: 8px;
  font-size: 18px;
  &:focus {
    outline: none;
  }

  ${media.phone`font-size: 14px`};
  ${media.phone`height: 60%`};
  ${media.phone`margin-left: 10px`};
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

  ${media.phone`height: 40px`};
  ${media.phone`margin-left: -15px`};
  ${media.phone`font-size: 14px`};
  ${media.phone`width: 70px`};
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
  ${media.phone`margin-left: 5px`};
  ${media.phone`display: none`};
`;

export const DropdownWrapper = styled.div`
  width: 116px;
  display: flex;
  align-items: center;
  border: 2px solid #ecf0f1;
  height: 100%;
`;

export const MainDropdownText = styled.div`
  color: rgb(66, 66, 65);
  font-size: 18px;
  opacity: 0.6;
  width: 93px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 80ms ease;
  }
`;

export const ChevronIcon = styled(ChevronDown)`
  color: #95a5a6;
  opacity: 0.8;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: black;
    transition: 80ms ease;
  }
`;

export const DropdownMenu = styled.div`
  width: 111.5px;
  border: 2px solid #ecf0f1;
  height: auto;
  background-color: #fff;
  margin-top: -3px;
  border-radius: 3px;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

export const DropdownItem = styled.div`
  color: rgb(66, 66, 65);
  font-size: 18px;
  opacity: 0.6;
  margin-left: 8px;
  padding: 1rem 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 80ms ease;
  }
`;
