import React from 'react';
import ReactLoading from 'react-loading';

import Template from '../Template';
import { Wrapper, Text } from './styles';
import colors from '../../utils/colors';

const Loading = () => (
  <Template>
    <Wrapper>
      <ReactLoading delay={0} type={'bubbles'} color={colors.primary} height={300} width={300} />
    </Wrapper>
  </Template>
);

export default Loading;
