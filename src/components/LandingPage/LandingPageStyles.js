import styled from 'styled-components';
import media from '../../utils/mediaTemplate';
import { Link } from 'react-router-dom';

import colors from '../../utils/colors';

export const Wrapper = styled.div`
  width: 1200px;
  ${media.tablet`width: 90%;`};
  margin: 2.5rem auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-size: 1.75rem;
  color: ${colors.primary};
  font-weight: bold;
`;

export const Text = styled.span`
  color: ${colors.primary};
  margin-left: 2rem;

  &:hover {
    cursor: pointer;
    transition: background 150ms ease-in;
  }
`;

export const Body = styled.div`
  margin: 6rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainText = styled.h1`
  font-size: 48px;
  font-weight: 400;
  line-height: 0.83;
  letter-spacing: -1.7px;
  text-align: center;
`;

export const Description = styled.span`
  color: #424770;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 1.24;
  margin: 24px auto 32px;
  max-width: 820px;
  padding-left: 8px;
  padding-right: 8px;
  opacity: 0.6;
  text-align: center;
`;

export const Button = styled.button`
  color: #fff;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  min-width: 168px;
  padding: 10px 15px;
  display: inline-block;
  vertical-align: middle;
  outline: 0;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2222222;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
  cursor: pointer;
  background: ${colors.primary};
  width: 150px;
  height: 43px;
  text-transform: uppercase;

  &:hover {
    background: rgba(9, 132, 280, 1);
  }
`;

export const SignUpText = styled.div`
  margin-top: 2rem;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    cursor: pointer;
    transition: background 120ms ease-in;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

export const DemoText = styled.span`
  color: ${colors.primary};
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  border-left: 2px solid #e1e3e3;

  &:hover {
    cursor: pointer;
  }
`;

export const FeaturesWrapper = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const FeaturesHeadingText = styled.div`
  font-size: 2rem;
`;

export const FeaturesSubheadingText = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

export const FeaturesDescriptionText = styled.div`
  font-size: 1.1rem;
  color: #617080;
`;

export const FeaturesIconsWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

export const FeaturesIconWrapper = styled.div`
  width: 300px;
`;

export const Footer = styled.div`
  border-top: 1px solid #ebebeb;
  display: flex;
  margin-top: 5rem;
  padding-top: 10px;
  justify-content: space-between;
`;

export const CopyrightText = styled.small`
  color: #617080;
  font-size: 13px;
  margin-top: 8px;
  opacity: 0.6;
`;

export const SocialIcons = styled.div`
  display: flex;
  width: 70px;
  justify-content: space-between;
`;

export const StyledATag = styled.a`
  text-decoration: none;
  color: inherit;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transition: background 150ms ease-in;
  }
`;

export const SecondaryButton = styled.div`
  margin-top: 1rem;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  min-width: 168px;
  width: auto;
  padding: 10px 15px;
  font-family: inherit;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  align-self: center;
  border: 1px solid #e9ebeb;
  border-bottom: 1px solid #e1e3e3;
  border-radius: 4px;
  background-color: #fff;
  color: rgba(14, 30, 37, 0.87);
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
  transition: all 0.2s ease;
  outline: 0;

  &:hover {
    background-color: #f5f5f5;
    color: rgba(14, 30, 37, 0.87);
    box-shadow: 0 8px 12px 0 rgba(233, 235, 235, 0.16), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    text-decoration: none;
    cursor: pointer;
  }
`;
