import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  height: 80vh;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CompanyName = styled.div`
  font-size: 5rem;
  font-weight: bold;
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
  width: 220px;
  border-radius: 4px;
  background-color: #1db954;
  margin: 1rem 0;
  border: 1px solid rgba(0, 184, 148, 0.3);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  color: #fff;
  &:hover {
    opacity: 0.9;
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
