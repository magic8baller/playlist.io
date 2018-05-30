import styled from 'styled-components';

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  position: absolute;
  margin-top: 3rem;
  background-color: white;
  box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px,
    rgba(0, 0, 0, 0.08) 0px 0px 1px;
  border-radius: 4px;
  margin-left: -11rem;
  min-width: 200px;
`;

export const MenuItemWrapper = styled.div``;

export const MenuItem = styled.div`
  display: flex;
  margin-top: 0.4rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 1rem;
  &:hover {
    transition: background 100ms ease-in;
    background-color: rgba(58, 56, 52, 0.08);
  }
`;

export const SignOut = styled.div`
  border-top: 1px solid rgb(242, 241, 240);
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-left: 1rem;
  margin-top: 10px;
  border-radius: 4px;
  &:hover {
    background-color: rgba(58, 56, 52, 0.08);
  }
`;
