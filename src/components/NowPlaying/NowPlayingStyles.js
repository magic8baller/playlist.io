import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 950px;
  margin: 1rem auto 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  color: rgba(99, 111, 123, 0.8);
  &:hover {
    color: inherit;
    cursor: pointer;
  }
`;

export const ActionText = styled.div`
  font-size: 14px;
`;

export const Picture = styled.div`
  flex-grow: 1;
  display: block;
`;

export const Tracks = styled.div`
  flex-grow: 1;
`;

export const TrackWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const TrackNumberWrapper = styled.div``;

export const Data = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ArtistName = styled.div`
  opacity: 0.6;
`;

export const icon = {
  marginRight: '6px'
};

export const search = {
  marginTop: '14px'
};
