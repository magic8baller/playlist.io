import styled from 'styled-components';
import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 5rem 0;
  border-bottom: 1px solid #ecf0f1;
  font-size: 14px;
  padding: 0 1rem;
  max-height: 36px;

  ${media.phone`margin: 1.5rem 0`};
`;

export const TabsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${media.phone`flex-direction: column`};
`;

export const TitleWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-right: 35px;
  margin-bottom: 14px;
  margin-top: -4px;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-size: 1.25rem;
`;

export const AngleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6px;
`;

export const NavText = styled.a`
  margin-right: 26px;
  padding-bottom: 16px;
  text-decoration: none;
  color: ${(props) => (props.isSelected ? 'inherit' : 'rgba(99, 111, 123, 0.8)')};
  border-bottom: ${(props) => (props.isSelected ? '2px solid #1DB954' : '2px solid #fff')};

  &:hover {
    color: inherit;
    cursor: pointer;
  }

  ${media.phone`display: none`};
  ${media.phone`border-bottom: #fff`};
`;

export const Settings = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  color: rgba(99, 111, 123, 0.8);
`;

export const Name = styled.div`
  &:hover {
    color: rgb(66, 66, 65);
  }
`;

export const nameStyle = { marginRight: '5px' };
