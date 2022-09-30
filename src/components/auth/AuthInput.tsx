import styled from "styled-components";

const AuthInput = styled.input`
  height: 34px;
  width: 200px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 1px;
  padding: 5px 10px;
  margin-bottom: 5px;
  &:nth-last-child(2) {
    margin-bottom: 20px;
  }
`;

export default AuthInput;
