import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid red;
  margin: 4rem auto;
`;

export const Picture = styled.div`
  flex-grow: 1;
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

// export const TrackNumberWrapper = styled.div`
//   height: 20px;
//   width: 20px;
//   border-radius: 50%;
//   background-color: rgba(129, 236, 236, 0.1);
//   border: 1px solid rgba(0, 184, 148, 0.3);
//   box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export const TrackNumberWrapper = styled.div``;

export const Data = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ArtistName = styled.div`
  opacity: 0.6;
`;
