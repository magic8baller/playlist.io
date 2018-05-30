import React from 'react';
import { string, object, func } from 'prop-types';

import { Wrapper, Text, Btn, BtnText } from './ErrorPageStyles';

const ErrorPage = ({ errorMsg, history, setPath }) => (
  <Wrapper>
    <Text>{errorMsg}</Text>
    <Btn onClick={() => setPath(history, '/')}>
      <BtnText>Back to Search</BtnText>
    </Btn>
  </Wrapper>
);

ErrorPage.propTypes = {
  errorMsg: string.isRequired,
  history: object.isRequired,
  setPath: func.isRequired
};

export default ErrorPage;
