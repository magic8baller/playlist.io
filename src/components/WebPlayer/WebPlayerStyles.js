import styled from 'styled-components';

import media from '../../utils/mediaTemplate';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  position: fixed;
  bottom: 0%;
  width: 96vw;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  z-index: 999;
  padding: 0 2rem;

  ${media.tablet`padding: 0 5px;`};
  ${media.tablet`width: 100%;`};
`;

export const Placeholder = styled.div`
  color: #fff;
`;

export const DeviceWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  justify-content: flex-end;
  ${media.tablet`padding-right: 20px;`};
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.3%;

  ${media.tablet`flex: 1;`};
  ${media.phone`margin-left: 20px;`};
  ${media.phone`margin-right: 20px;`};
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const DeviceText = styled.div`
  color: rgba(99, 111, 123, 0.8);
  font-size: 14px;
  margin-right: 0.6rem;
`;

export const TrackWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
`;

export const TrackInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 0.5rem;
`;

export const ProgressBarArea = styled.div`
  margin-top: 0.5rem;
  display: ${(props) => (props.isActivated ? 'flex' : 'none')};
  align-items: center;
  font-size: 14px;
  ${media.phone`display: none;`};
`;

export const ProgressBarWrapper = styled.div`
  width: 400px;
  height: 5px;
  border-radius: 12px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  margin: 0 1rem;
  ${media.tablet`width: 33vw;`};
`;

export const ProgressBar = styled.div`
  width: ${(props) => props.progressPercentage};
  height: 100%;
  background-color: #1db954;
  border-radius: 12px;
`;

export const TrackName = styled.div``;

export const ArtistName = styled.div`
  color: rgba(99, 111, 123, 0.8);
`;

export const NonPremiumWrapper = styled.div`
  text-align: center;
  font-size: 14px;
  width: 100%;
`;

export const play = {
  margin: '0 2rem',
  fill: 'rgb(66,66,65)'
};

export const secondaryControl = {
  fill: 'rgb(66,66,65)'
};

export const devices = {
  color: 'rgba(99, 111, 123, 0.8)'
};

export const notActivated = {
  display: 'none'
};
