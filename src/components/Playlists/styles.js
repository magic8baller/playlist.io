import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 4.4rem;
  display: flex;
  flex-direction: column;
`;

export const Subtext = styled.div`
  margin-left: 1rem;
  opacity: 0.6;
  margin-top: -1.1rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PlaylistWrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(23, 43, 99, 0.26) 0 7px 42px;

  &:hover {
    cursor: pointer;
    transition: background 150ms ease-in;
  }
`;

export const AlbumArt = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 4px 4px 0px 0px;
`;

export const TitleText = styled.div`
  margin-bottom: 0.2rem;
`;

export const SongCount = styled.div`
  opacity: 0.6;
  font-size: 14px;
`;

export const AnotherTextWrapper = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`;
