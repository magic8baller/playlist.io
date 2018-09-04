import styled from 'styled-components';

export const ContentWrapper = styled.div`
  margin: 0 4rem;
`;

export const Title = styled.div`
  font-size: 1.8rem;
  text-align: left;
`;

export const SearchInputWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  width: 100%;
  height: 60px;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: rgba(23, 43, 99, 0.26) 0 7px 42px;
`;

export const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  margin-left: 1rem;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
  }
`;

export const Subtext = styled.div`
  font-size: 14px;
  margin-top: 1.2rem;
  opacity: 0.7;
`;
