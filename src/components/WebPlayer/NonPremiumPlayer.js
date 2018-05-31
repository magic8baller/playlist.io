import React from 'react';

import * as Style from './WebPlayerStyles';

const NonPremiumPlayer = () => (
  <Style.Wrapper>
    <Style.NonPremiumWrapper>
      You must have Spotify Premium to use the Web Player.
    </Style.NonPremiumWrapper>
  </Style.Wrapper>
);

export default NonPremiumPlayer;
