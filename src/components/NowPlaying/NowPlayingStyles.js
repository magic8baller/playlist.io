import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 950px;
  margin: 1rem auto 0;
  height: 566px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const Picture = styled.div`
  margin-right: 7rem;
  display: block;
  display: flex;
  flex-direction: column;
`;

export const Tracks = styled.div`
  flex-grow: 1;
  margin-top: 2.5rem;
`;

export const TopTrackWrapper = styled.div`
  margin-top: 2.2rem;
  width: 420px;
`;

export const TrackWrapper = styled.div`
  margin: 2.6rem 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

export const Data = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TracksGridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

export const ArtistName = styled.div`
  opacity: 0.6;
`;

export const search = {
  marginTop: '14px'
};

export const style = {
  randomPic: {
    width: '452px',
    height: '452px',
    marginTop: '-2rem'
  },
  headline: {
    width: '300px'
  },
  tracks: {
    marginTop: '-2.7rem',
    marginLeft: '-1.05rem'
  },
  dummyRandomPic: {
    width: '0',
    height: '0'
  }
};
