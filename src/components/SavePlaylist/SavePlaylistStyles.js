import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  color: rgba(99, 111, 123, 0.8);
  &:hover {
    color: inherit;
    cursor: pointer;
  }
`;

export const Text = styled.div`
  font-size: 14px;
`;

export const InputWrapper = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  font-size: 15px;
  line-height: 26px;
  padding: 4px 10px;
  position: relative;
  border-radius: 3px;
  border: 1px solid rgb(231, 230, 229);
  background: white;
  cursor: text;
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 1px inset;
`;

export const Title = styled.div`
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(165, 165, 165);
  margin-bottom: 4px;
`;

export const Input = styled.input`
  height: 95%;
  flex: 1;
  font-size: 14px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const customContentStyle = {
  width: '500px'
};

export const icon = {
  marginRight: '6px'
};
