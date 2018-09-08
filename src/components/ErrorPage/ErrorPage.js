import React from 'react';
import { Link } from 'react-router-dom';
import { string, object, func } from 'prop-types';
import Template from '../Template';

import { Wrapper, Text, Btn, BtnText } from './ErrorPageStyles';

const ErrorPage = ({ errorMsg, headingText, subtext }) => (
  <Template headingText={headingText} subtext={subtext}>
    <Wrapper>
      <Text>{errorMsg}</Text>
      <Btn>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <BtnText>Back to Search</BtnText>
        </Link>
      </Btn>
    </Wrapper>
  </Template>
);

ErrorPage.propTypes = {
  errorMsg: string.isRequired,
  history: object.isRequired,
  setPath: func.isRequired
};

export default ErrorPage;
