import React from 'react';

import * as Style from './WebPlayerStyles';
import { SIGN_IN_USER_ENDPOINT } from '../../utils/endpoints';

const handleSignIn = () => {
  window.location = SIGN_IN_USER_ENDPOINT;
};

const NonPremiumPlayer = () => (
  <Style.Wrapper>
    <Style.NonPremiumWrapper onClick={handleSignIn}>
      You must have Spotify Premium to use the Web Player. Sign in{' '}
      <span style={{ textDecoration: 'underline' }}>here.</span>
    </Style.NonPremiumWrapper>
  </Style.Wrapper>
);

export default NonPremiumPlayer;
