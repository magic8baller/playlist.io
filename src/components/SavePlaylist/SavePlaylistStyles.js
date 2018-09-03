import styled from 'styled-components';

import media from '../../utils/mediaTemplate';
import colors from '../../utils/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  color: rgba(99, 111, 123, 0.8);
  &:hover {
    color: inherit;
    cursor: pointer;
  }

  ${media.tablet`margin-right: 17rem;`};
  ${media.phone`display: none;`};
  ${media.phone`margin-top: -2rem;`};
`;

export const Text = styled.div`
  font-size: 14px;
  font-family: inherit;
`;

export const InputWrapper = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  font-size: 15px;
  line-height: 26px;
  padding: 4px 10px;
  position: relative;
  border-radius: 3px;
  border: 1px solid rgb(231, 230, 229);
  background: white;
  cursor: text;
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 1px inset;
`;

export const Title = styled.div`
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(165, 165, 165);
  margin-bottom: 4px;
`;

export const Input = styled.input`
  height: 95%;
  flex: 1;
  font-size: 14px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const Btn = styled.button`
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};

  border: 2px solid ${colors.primary};
  font-size: 1em;
  margin: 1em;
  margin-left: 3px;
  padding: 0.25em 1em;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
`;

export const theme = {
  fg: `${colors.primary}`,
  bg: 'white'
};

export const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});

export const customContentStyle = {
  width: '500px'
};

export const icon = {
  marginRight: '6px'
};
