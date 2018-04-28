import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6rem auto;
  align-items: center;
`;

export const CompanyName = styled.div`
  font-size: 5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export const Description = styled.div`
  margin: 1rem 0;
  font-size: 1.3rem;
`;

export const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 250px;
  border-radius: 4px;
  background-color: rgba(129, 236, 236, 0.1);
  margin: 1rem 0;
  border: 1px solid rgba(0, 184, 148, 0.3);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  color: #1db954;
  &:hover {
    background-color: rgba(58, 56, 52, 0.08);
    cursor: pointer;
    transition: background-color 100ms ease-in;
  }
`;

export const BtnText = styled.div`
  font-size: 1.3rem;
`;

export const spotifyLogo = {
  marginRight: '0.5rem',
  marginTop: '3px'
};
