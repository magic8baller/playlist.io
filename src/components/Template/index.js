import React from 'react';

import { DashboardWrapper, ContentWrapper } from '../Dashboard/styles';
import { HeadingText } from '../Dashboard/styles';
import { Wrapper, TextWrapper, Subtext } from '../Playlists/styles';
import SidePanelContainer from '../SidePanel/container';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';

const Template = ({ children, headingText, subtext, height }) => {
  console.log({ height });

  return (
    <DashboardWrapper>
      <SaveAnimationContainer />
      <SidePanelContainer />
      <ContentWrapper height={height}>
        <Wrapper>
          <TextWrapper>
            <HeadingText>{headingText}</HeadingText>
            <Subtext>{subtext}</Subtext>
          </TextWrapper>
        </Wrapper>
        {children}
      </ContentWrapper>
    </DashboardWrapper>
  );
};

export default Template;
