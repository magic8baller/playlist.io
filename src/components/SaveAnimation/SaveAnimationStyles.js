import styled from 'styled-components';
import Spotify from 'react-icons/lib/fa/spotify';
import { CheckCircle } from 'react-feather';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpotifyIcon = styled(Spotify)``;

export const CheckCircleStyled = styled(CheckCircle)``;

export const Text = styled.div`
  font-size: 1.25rem;
  margin: 0 1.25rem;
`;
