import styled from 'styled-components';

import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 1rem auto 0;
  height: 566px;

  ${media.phone`width: 100vw`};
  ${media.phone`height: inherit`};
`;

export const ContentWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;

  ${media.phone`flex-direction: column`};
  ${media.phone`margin-top: -1rem`};
`;

export const Picture = styled.div`
  margin-right: 7rem;
  display: block;
  display: flex;
  flex-direction: column;

  ${media.tablet`margin-right: 4rem`};
  ${media.tablet`align-items: center`};
  ${media.phone`margin-right: 0`};
`;

export const Tracks = styled.div`
  flex-grow: 1;
  margin-top: 2.3rem;

  ${media.phone`display: flex`};
  ${media.phone`flex-direction: column`};
`;

export const TopTrackWrapper = styled.div`
  margin-top: 2.2rem;
  width: 420px;

  ${media.phone`width: 250px`};
`;

export const TracksGridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

export const FeaturedTracksEmoji = styled.span`
  margin-right: 10px;
`;

export const PictureWrapper = styled.div`
  margin-left: 9rem;
  ${media.phone`margin-left: 0`};
`;

export const TracksWrapper = styled.div`
  flex: 1;

  ${media.phone`display: flex`};
  ${media.phone`flex-direction: column`};
  ${media.phone`align-items: center`};
`;

export const TextWrapper = styled.div`
  ${media.phone`display: flex;`};
  ${media.phone`justify-content: center;`};
  ${media.phone`margin-top: 4rem;`};
  ${media.phone`font-size: 1.8rem;`};
  ${media.phone`margin-right: 40px;`};
`;

export const FloatingBtnWrapper = styled.div`
  margin-top: 31.5rem;
  ${media.phone`margin-top: 0`};
  ${media.phone`display: none`};
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
