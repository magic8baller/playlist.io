import React from 'react';

import { DashboardWrapper, ContentWrapper } from '../Dashboard/styles';
import SidePanelContainer from '../SidePanel/container';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';

const Template = ({ children }) => (
  <DashboardWrapper>
    <SaveAnimationContainer />
    <SidePanelContainer />
    <ContentWrapper>{children}</ContentWrapper>
  </DashboardWrapper>
);

export default Template;
