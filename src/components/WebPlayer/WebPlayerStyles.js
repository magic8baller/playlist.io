import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: fixed;
  bottom: 0%;
  width: 96vw;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  z-index: 999;
  padding: 0 2rem;
`;

export const Placeholder = styled.div`
  color: #fff;
`;

export const DeviceWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  justify-content: flex-end;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 33.3%;
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

export const TrackName = styled.div``;
export const ArtistName = styled.div`
  color: rgba(99, 111, 123, 0.8);
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
