import styled from 'styled-components';
import { Search } from 'react-feather';

export const Wrapper = styled.div`
  margin: 2.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

export const InnerWrapper = styled.div`
  width: 800px;
  margin: 8rem auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 1.8rem;
  width: 650px;
  margin-bottom: 3rem;
`;

export const Form = styled.div`
  width: 690px;
  height: 65px;
  border-radius: 4px;
  box-shadow: rgba(29, 29, 31, 0.15) 0 10px 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

export const Input = styled.input`
  height: 95%;
  flex: 1;
  font-size: 18px;
  margin-left: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
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
`;

export const BtnText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-align: center;
`;

export const SearchIcon = styled(Search)`
  margin-left: 1rem;
  z-index: 999;
  color: black;
  margin-top: 3px;
`;
