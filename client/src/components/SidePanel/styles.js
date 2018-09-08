import styled from 'styled-components';
import colors from '../../utils/colors';
import { NavLink } from 'react-router-dom';

export const SidePanelWrapper = styled.div`
  background-color: #fff;
  width: 260px;
  padding-left: 3rem;
  padding-top: 5.1rem;
  font-size: 14px;
`;

export const Heading = styled.div`
  color: #bdc3c7;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  letter-spacing: 0.5px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: #3b364e;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transition: background 120ms ease-in;
    cursor: pointer;
  }
`;

export const MenuItemText = styled.div`
  margin-left: 10px;
  font-weight: 500;
  color: ${({ isSelected }) => (isSelected ? colors.primary : 'default')};
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-bottom: 1.3rem;
  color: #3b364e;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transition: background 120ms ease-in;
    cursor: pointer;
  }

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

export const activeStyle = {
  color: `${colors.primary}`,
  opacity: 1
};
