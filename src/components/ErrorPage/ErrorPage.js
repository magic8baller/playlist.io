import React from 'react';

import { Wrapper, Text, Btn, BtnText } from './ErrorPageStyles';

const ErrorPage = ({ errorMsg, history, setPath }) => (
  <Wrapper>
    <Text>{errorMsg}</Text>
    <Btn onClick={() => setPath(history, '/')}>
      <BtnText>Back to Home</BtnText>
    </Btn>
  </Wrapper>
);

export default ErrorPage;
