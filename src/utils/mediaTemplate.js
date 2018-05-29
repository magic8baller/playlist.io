import { css } from 'styled-components';

const sizes = {
  phone: 768,
  tablet: 1200
};

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  console.log(acc);
  return acc;
}, {});
