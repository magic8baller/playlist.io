import React from 'react';
import { Link } from 'react-router-dom';
import { string, object, func } from 'prop-types';

import { Wrapper, Text, Btn, BtnText } from './ErrorPageStyles';

const ErrorPage = ({ errorMsg, history, setPath }) => (
  <Wrapper>
    <Text>{errorMsg}</Text>

    <Btn>
      <Link to="/search" style={{ textDecoration: 'none' }}>
        <BtnText>Back to Search</BtnText>
      </Link>
    </Btn>
  </Wrapper>
);

ErrorPage.propTypes = {
  errorMsg: string.isRequired,
  history: object.isRequired,
  setPath: func.isRequired
};

export default ErrorPage;
